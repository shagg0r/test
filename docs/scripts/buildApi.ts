import { mkdirSync } from 'fs';
import * as fse from 'fs-extra';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import * as yargs from 'yargs';
import { findPages, findComponents } from 'docs/src/modules/utils/find';
import * as ttp from 'typescript-to-proptypes';
import {
  ComponentInfo,
  getGenericComponentInfo,
  getMaterialComponentInfo,
  getBaseComponentInfo,
  extractApiPage,
} from './buildApiUtils';
import buildComponentApi, {
  writePrettifiedFile,
  ReactApi,
} from './ApiBuilders/ComponentApiBuilder';

const apiDocsTranslationsDirectory = path.resolve('docs', 'translations', 'api-docs');

async function removeOutdatedApiDocsTranslations(components: readonly ReactApi[]): Promise<void> {
  const componentDirectories = new Set<string>();
  const files = await fse.readdir(apiDocsTranslationsDirectory);
  await Promise.all(
    files.map(async (filename) => {
      const filepath = path.join(apiDocsTranslationsDirectory, filename);
      const stats = await fse.stat(filepath);
      if (stats.isDirectory()) {
        componentDirectories.add(filepath);
      }
    }),
  );

  const currentComponentDirectories = new Set(
    components.map((component) => {
      return path.resolve(apiDocsTranslationsDirectory, kebabCase(component.name));
    }),
  );

  const outdatedComponentDirectories = new Set(componentDirectories);
  currentComponentDirectories.forEach((componentDirectory) => {
    outdatedComponentDirectories.delete(componentDirectory);
  });

  await Promise.all(
    Array.from(outdatedComponentDirectories, (outdatedComponentDirectory) => {
      return fse.remove(outdatedComponentDirectory);
    }),
  );
}

const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []) => {
  const files = fse.readdirSync(dirPath);

  files.forEach((file) => {
    if (fse.statSync(`${dirPath}/${file}`).isDirectory()) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, '/', file));
    }
  });

  return arrayOfFiles;
};

function findApiPages(relativeFolder: string) {
  let pages: Array<{ pathname: string }> = [];
  let filePaths = [];
  try {
    filePaths = getAllFiles(path.join(process.cwd(), relativeFolder));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return [];
  }
  filePaths.forEach((itemPath) => {
    if (itemPath.endsWith('.js')) {
      const data = extractApiPage(itemPath);

      pages.push({ pathname: data.apiPathname });
    }
  });

  // sort by pathnames without '-' so that e.g. card comes before card-action
  pages = pages.sort((a, b) => {
    const pathnameA = a.pathname.replace(/-/g, '');
    const pathnameB = b.pathname.replace(/-/g, '');
    if (pathnameA < pathnameB) {
      return -1;
    }
    if (pathnameA > pathnameB) {
      return 1;
    }
    return 0;
  });

  return pages;
}

interface Settings {
  input: {
    /**
     * Component directories to be used to generate API
     */
    libDirectory: string[];
  };
  output: {
    /**
     * The output path of `pagesApi` generated from `input.pageDirectory`
     */
    apiManifestPath: string;
  };
  getApiPages: () => Array<{ pathname: string }>;
  getComponentInfo: (filename: string) => ComponentInfo;
}

/**
 * This is the refactored version of the current API building process, nothing's changed.
 */
const BEFORE_MIGRATION_SETTINGS: Settings[] = [
  {
    input: {
      libDirectory: [
        path.join(process.cwd(), 'packages/mui-base/src'),
        path.join(process.cwd(), 'packages/mui-material/src'),
        path.join(process.cwd(), 'packages/mui-lab/src'),
      ],
    },
    output: {
      apiManifestPath: path.join(process.cwd(), 'docs/src/pagesApi.js'),
    },
    getApiPages: () => {
      const pages = findPages({ front: true }, path.join(process.cwd(), 'docs/pages'));
      return pages.find(({ pathname }) => pathname.indexOf('api') !== -1)?.children ?? [];
    },
    getComponentInfo: getGenericComponentInfo,
  },
];

/**
 * Once the preparation is done (as described in https://github.com/mui-org/material-ui/issues/30091), swithc to this settings.
 * It will generate API for the current & `/material` paths, then set the redirect to link `/api/*` to `/material/api/*`
 * At this point, `mui-base` content is still live in with `mui-material`.
 */
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MIGRATION_SETTINGS: Settings[] = [
  ...BEFORE_MIGRATION_SETTINGS,
  {
    input: {
      libDirectory: [
        path.join(process.cwd(), 'packages/mui-base/src'),
        path.join(process.cwd(), 'packages/mui-material/src'),
        path.join(process.cwd(), 'packages/mui-lab/src'),
      ],
    },
    output: {
      apiManifestPath: path.join(process.cwd(), 'docs/data/material/pagesApi.js'),
    },
    getApiPages: () => findApiPages('docs/pages/material/api/mui-material'),
    getComponentInfo: getMaterialComponentInfo,
  },
];

/**
 * Once redirects are stable
 * - Create `mui-base` content in `docs/pages/base/*` and switch to this settings.
 * - Remove old content directories, eg. `docs/pages/components/*`, ...etc
 */
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const POST_MIGRATION_SETTINGS: Settings[] = [
  ...BEFORE_MIGRATION_SETTINGS,
  {
    input: {
      libDirectory: [
        path.join(process.cwd(), 'packages/mui-material/src'),
        path.join(process.cwd(), 'packages/mui-lab/src'),
      ],
    },
    output: {
      apiManifestPath: path.join(process.cwd(), 'docs/data/material/pagesApi.js'),
    },
    getApiPages: () => findApiPages('docs/pages/material/api'),
    getComponentInfo: getMaterialComponentInfo,
  },
  {
    input: {
      libDirectory: [path.join(process.cwd(), 'packages/mui-base/src')],
    },
    output: {
      apiManifestPath: path.join(process.cwd(), 'docs/data/base/pagesApi.js'),
    },
    getApiPages: () => findApiPages('docs/pages/base/api'),
    getComponentInfo: getBaseComponentInfo,
  },
  // add other products, eg. joy, data-grid, ...etc
];

const ACTIVE_SETTINGS = POST_MIGRATION_SETTINGS;

async function run(argv: { grep?: string }) {
  const grep = argv.grep == null ? null : new RegExp(argv.grep);
  let allBuilds: Array<PromiseSettledResult<ReactApi | null>> = [];
  await ACTIVE_SETTINGS.reduce(async (resolvedPromise, setting) => {
    const workspaceRoot = path.resolve(__dirname, '../../');
    /**
     * @type {string[]}
     */
    const componentDirectories = setting.input.libDirectory;
    const apiPagesManifestPath = setting.output.apiManifestPath;

    const manifestDir = apiPagesManifestPath.match(/(.*)\/[^/]+\./)?.[1];
    if (manifestDir) {
      mkdirSync(manifestDir, { recursive: true });
    }

    /**
     * components: Array<{ filename: string }>
     * e.g.
     * [{ filename: '/Users/user/Projects/material-ui/packages/mui-material/src/Accordion/Accordion.js'}, ...]
     */
    const components = componentDirectories
      .reduce((directories, componentDirectory) => {
        return directories.concat(findComponents(componentDirectory));
      }, [] as ReadonlyArray<{ filename: string }>)
      .filter((component) => {
        if (component.filename.includes('ThemeProvider')) {
          return false;
        }
        if (grep === null) {
          return true;
        }
        return grep.test(component.filename);
      });

    const tsconfig = ttp.loadConfig(path.resolve(workspaceRoot, './tsconfig.json'));
    const program = ttp.createTSProgram(
      components.map((component) => {
        if (component.filename.endsWith('.tsx')) {
          return component.filename;
        }
        if (component.filename.endsWith('.js')) {
          return component.filename.replace(/\.js$/, '.d.ts');
        }
        throw new TypeError(
          `Unexpected component filename '${component.filename}'. Expected either a .tsx or .js file.`,
        );
      }),
      tsconfig,
    );

    const componentBuilds = components.map(async (component) => {
      try {
        const { filename } = component;
        const componentInfo = setting.getComponentInfo(filename);

        mkdirSync(componentInfo.apiPagesDirectory, { mode: 0o777, recursive: true });

        return buildComponentApi(componentInfo, program);
      } catch (error: any) {
        error.message = `${path.relative(process.cwd(), component.filename)}: ${error.message}`;
        throw error;
      }
    });

    const builds = await Promise.allSettled(componentBuilds);

    const fails = builds.filter(
      (promise): promise is PromiseRejectedResult => promise.status === 'rejected',
    );

    fails.forEach((build) => {
      console.error(build.reason);
    });
    if (fails.length > 0) {
      process.exit(1);
    }

    allBuilds = [...allBuilds, ...builds];

    const source = `module.exports = ${JSON.stringify(setting.getApiPages())}`;
    writePrettifiedFile(apiPagesManifestPath, source);

    await resolvedPromise;
  }, Promise.resolve());

  if (grep === null) {
    const componentApis = allBuilds
      .filter((build): build is PromiseFulfilledResult<ReactApi> => {
        return build.status === 'fulfilled' && build.value !== null;
      })
      .map((build) => {
        return build.value;
      });
    await removeOutdatedApiDocsTranslations(componentApis);
  }
}

yargs
  .command({
    command: '$0',
    describe: 'formats codebase',
    builder: (command) => {
      return command.option('grep', {
        description:
          'Only generate files for component filenames matching the pattern. The string is treated as a RegExp.',
        type: 'string',
      });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
