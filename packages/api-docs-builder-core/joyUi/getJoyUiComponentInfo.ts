import fs from 'fs';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import { getHeaders, getTitle } from '@mui/markdown';
import {
  ComponentInfo,
  extractPackageFile,
  fixPathname,
  getMuiName,
  getSystemComponents,
  parseFile,
} from '@mui-internal/api-docs-builder/buildApiUtils';
import findPagesMarkdown from '@mui-internal/api-docs-builder/utils/findPagesMarkdown';

export function getJoyUiComponentInfo(filename: string): ComponentInfo {
  const { name } = extractPackageFile(filename);
  let srcInfo: null | ReturnType<ComponentInfo['readFile']> = null;
  if (!name) {
    throw new Error(`Could not find the component name from: ${filename}`);
  }
  return {
    filename,
    name,
    muiName: getMuiName(name),
    apiPathname: `/joy-ui/api/${kebabCase(name)}/`,
    apiPagesDirectory: path.join(process.cwd(), `docs/pages/joy-ui/api`),
    isSystemComponent: getSystemComponents().includes(name),
    readFile: () => {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getInheritance: (inheritedComponent = srcInfo?.inheritedComponent) => {
      if (!inheritedComponent) {
        return null;
      }

      const urlComponentName = kebabCase(inheritedComponent.replace(/unstyled/i, ''));

      // TODO: build a map for Base UI component name -> API URL path
      // or even better, migrate away from the /components-api/ and /hooks-api/ URLs, flatten.
      if (inheritedComponent === 'PopperUnstyled') {
        return {
          name: 'Popper',
          apiPathname: `/base-ui/react-popper/components-api/#${urlComponentName}`,
        };
      }

      // `inheritedComponent` node is coming from test files.
      // `inheritedComponent` must include `Unstyled` suffix for parser to recognise that the component inherits Base UI component
      // e.g., Joy Menu inherits Base UI Popper, and its test file uses the name `PopperUnstyled` so that we can recognise here that
      // Joy Menu is inheriting a base component. In terms of documentation, we should no longer use the name `PopperUnstyled`, and hence
      // we remove the suffix here.
      return {
        name: inheritedComponent.replace(/unstyled/i, ''),
        apiPathname: `/${
          inheritedComponent.match(/unstyled/i) ? 'base-ui' : 'joy-ui'
        }/api/${urlComponentName}/`,
      };
    },
    getDemos: () => {
      const allMarkdowns = findPagesMarkdown().map((markdown) => {
        const markdownContent = fs.readFileSync(markdown.filename, 'utf8');
        const markdownHeaders = getHeaders(markdownContent) as any;

        return {
          ...markdown,
          markdownContent,
          components: markdownHeaders.components as string[],
        };
      });
      return allMarkdowns
        .filter((page) => page.pathname.startsWith('/joy') && page.components.includes(name))
        .map((page) => ({
          demoPageTitle: getTitle(page.markdownContent),
          demoPathname: fixPathname(page.pathname),
        }));
    },
  };
}
