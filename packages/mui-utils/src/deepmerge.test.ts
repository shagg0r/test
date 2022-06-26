import { expect } from 'chai';

import deepmerge from './deepmerge';

describe('deepmerge', () => {
  // https://snyk.io/blog/after-three-years-of-silence-a-new-jquery-prototype-pollution-vulnerability-emerges-once-again/
  it('should not be subject to prototype pollution', () => {
    deepmerge({}, JSON.parse('{ "myProperty": "a", "__proto__" : { "isAdmin" : true } }'), {
      clone: false,
    });

    expect({}).not.to.have.property('isAdmin');
  });

  // https://github.com/mui/material-ui/issues/20095
  it('should not merge HTML elements', () => {
    const element = document.createElement('div');
    const element2 = document.createElement('div');

    const result = deepmerge({ element }, { element: element2 });

    expect(result.element).to.equal(element2);
  });

  // https://github.com/mui/material-ui/issues/25075
  it('should reset source when target is undefined', () => {
    const result = deepmerge(
      {
        '&.Mui-disabled': {
          color: 'red',
        },
      },
      {
        '&.Mui-disabled': undefined,
      },
    );
    expect(result).to.deep.equal({
      '&.Mui-disabled': undefined,
    });
  });

  it('should merge keys that do not exist in source', () => {
    const result = deepmerge({ foo: { baz: 'test' } }, { foo: { bar: 'test' }, bar: 'test' });
    expect(result).to.deep.equal({
      foo: { baz: 'test', bar: 'test' },
      bar: 'test',
    });
  });

  it('not an object, returns {}', () => {
    expect(deepmerge([], { b: 1 })).to.deep.equal({});

    expect(deepmerge({ b: 1 }, [1])).to.deep.equal({ b: 1 });

    expect(deepmerge(() => {}, { b: 1 })).to.deep.equal({});

    expect(deepmerge({ b: 1 }, () => {})).to.deep.equal({ b: 1 });

    expect(deepmerge(new Map([[1, 0]]), { b: 1 })).to.deep.equal({});

    expect(deepmerge({ b: 1 }, new Map([[1, 0]]))).to.deep.equal({ b: 1 });

    expect(deepmerge(new Set([[1, 0]]), { b: 1 })).to.deep.equal({});

    expect(deepmerge({ b: 1 }, new Set([[1, 0]]))).to.deep.equal({ b: 1 });
  });
});
