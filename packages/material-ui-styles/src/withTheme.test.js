import React from 'react';
import { assert } from 'chai';
import { createMount } from '@material-ui/core/test-utils';
import PropTypes from 'prop-types';
import withTheme from './withTheme';
import ThemeProvider from './ThemeProvider';

describe('withTheme', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should inject the theme', () => {
    function Test(props) {
      return <span>{props.theme.foo}</span>;
    }

    Test.propTypes = {
      theme: PropTypes.object,
    };

    const TestWithTheme = withTheme()(Test);

    const wrapper = mount(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <TestWithTheme />
      </ThemeProvider>,
    );
    assert.strictEqual(wrapper.text(), 'foo');
  });

  it('does not hoist statics', () => {
    const Test = () => null;
    Test.someStatic = 'will not get hoisted';
    const TestWithTheme = withTheme()(Test);
    assert.strictEqual(TestWithTheme.someStatic, undefined);
  });
});
