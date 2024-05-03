import path from 'path';
import { expect } from 'chai';
import { jscodeshift } from '../../../testUtils';
import transform from './sx-v6';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v6.0.0', () => {
    describe('basic sx-v6', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/basic-sx.actual.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/basic-sx.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/basic-sx.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/basic-sx.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
