import * as fs from 'node:fs';
import * as path from 'node:path';
import { expect } from 'chai';
import { asyncResolveFallback } from '@wyw-in-js/shared';
import { TransformCacheCollection, transform, createFileReporter } from '@wyw-in-js/transform';
import { preprocessor } from '@pigmentcss/react/utils';

const files = fs.readdirSync(path.join(__dirname, 'fixtures'));

const theme = {
  palette: {
    primary: {
      main: 'red',
    },
  },
  size: {
    font: {
      h1: '3rem',
    },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        rail: {
          fontSize: '3rem',
        },
      },
    },
  },
};

describe('zero-runtime', () => {
  files.forEach((file) => {
    it(`test input file ${file}`, async () => {
      if (file.includes('.output.')) {
        return;
      }
      const cache = new TransformCacheCollection();
      const { emitter: eventEmitter } = createFileReporter(false);
      const inputFilePath = path.join(__dirname, 'fixtures', file);
      const outputFilePath = path.join(__dirname, 'fixtures', file.replace('.input.', '.output.'));
      const outputCssFilePath = path.join(
        __dirname,
        'fixtures',
        file.replace('.input.js', '.output.css'),
      );
      const inputContent = fs.readFileSync(inputFilePath, 'utf8');
      const outputContent = fs.readFileSync(outputFilePath, 'utf8');
      const outputCssContent = fs.readFileSync(outputCssFilePath, 'utf8');

      const result = await transform(
        {
          options: {
            filename: inputFilePath,
            preprocessor,
            pluginOptions: {
              themeArgs: {
                theme,
              },
              babelOptions: {
                configFile: false,
                babelrc: false,
              },
              tagResolver(_source, tag) {
                return require.resolve(`../exports/${tag}`);
              },
            },
          },
          cache,
          eventEmitter,
        },
        inputContent,
        asyncResolveFallback,
      );

      expect(result.cssText).to.equal(outputCssContent);
      expect(result.code.trim()).to.equal(outputContent.trim());
    });
  });
});
