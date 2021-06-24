import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './autocomplete-rename-closeicon';

function read(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8').toString();
}

describe('@material-ui/codemod', () => {
  describe('v5.0.0', () => {
    describe('autocomplete-rename-closeicon', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./autocomplete-rename-closeicon.test/actual.js'),
            path: require.resolve('./autocomplete-rename-closeicon.test/actual.js'),
          },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./autocomplete-rename-closeicon.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./autocomplete-rename-closeicon.test/expected.js'),
            path: require.resolve('./autocomplete-rename-closeicon.test/expected.js'),
          },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./autocomplete-rename-closeicon.test/expected.js');
        expect(actual.replace(/\r\n/g, '\n')).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
