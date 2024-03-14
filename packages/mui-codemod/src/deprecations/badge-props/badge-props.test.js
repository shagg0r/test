import path from 'path';
import { expect } from 'chai';
import transform from './badge-props';
import { jscodeshift } from '../../../testUtils';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('deprecations', () => {
    describe('badge-props', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/actual.js') },
          { jscodeshift },
          { printOptions: { trailingComma: true } },
        );

        const expected = read('./test-cases/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform({ source: read('./test-cases/actual.js') }, { jscodeshift }, {});

        const excepted = read('./test-cases/expected.js');
        expect(actual).to.equal(excepted, 'The transformed version should be correct');
      });
    });

    describe('[theme] badge-props', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/theme.actual.js') },
          { jscodeshift },
          { printOptions: { trailingComma: false } },
        );

        const expected = read('./test-cases/theme.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/theme.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/theme.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
