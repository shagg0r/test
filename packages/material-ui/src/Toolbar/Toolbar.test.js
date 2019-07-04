import React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { cleanup, createClientRender } from 'test/utils/createClientRender';
import Toolbar from './Toolbar';
import { createMuiTheme, MuiThemeProvider } from '../styles';

describe('<Toolbar />', () => {
  let mount;
  const render = createClientRender({ strict: true });
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<Toolbar>foo</Toolbar>);
  });

  afterEach(() => {
    cleanup();
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Toolbar />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
  }));

  it('should render with gutters class', () => {
    const { container } = render(<Toolbar className="woofToolbar">foo</Toolbar>);

    expect(container.firstChild).to.have.class(classes.gutters);
  });

  it('can disable the gutters', () => {
    const { container } = render(<Toolbar disableGutters>foo</Toolbar>);

    expect(container.firstChild).not.to.have.class(classes.gutters);
  });

  it('can condense itself', () => {
    const { container } = render(<Toolbar variant="dense">foo</Toolbar>);

    expect(container.firstChild).to.have.class(classes.dense);
  });

  it('condenses itself in a dense theme', () => {
    const { container } = render(
      <MuiThemeProvider theme={createMuiTheme({ dense: true })}>
        <Toolbar variant="dense">foo</Toolbar>
      </MuiThemeProvider>,
    );

    expect(container.firstChild).to.have.class(classes.dense);
  });

  it('prefers the variant prop over theme density', () => {
    const { container } = render(
      <MuiThemeProvider theme={createMuiTheme({ dense: true })}>
        <Toolbar variant="regular">foo</Toolbar>
      </MuiThemeProvider>,
    );

    expect(container.firstChild).not.to.have.class(classes.dense);
  });
});
