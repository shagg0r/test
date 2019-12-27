import React from 'react';
import { assert, expect } from 'chai';
import { createMount, createShallow, getClasses } from '@material-ui/core/test-utils';
import { createMuiTheme } from '@material-ui/core/styles';
import describeConformance from '../test-utils/describeConformance';
import Grid, { styles } from './Grid';

describe('<Grid />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<Grid />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Grid />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));

  describe('prop: container', () => {
    it('should apply the container class', () => {
      const wrapper = shallow(<Grid container />);
      assert.strictEqual(wrapper.hasClass(classes.container), true);
    });
  });

  describe('prop: item', () => {
    it('should apply the item class', () => {
      const wrapper = shallow(<Grid item />);
      assert.strictEqual(wrapper.hasClass(classes.item), true);
    });
  });

  describe('prop: xs', () => {
    it('should apply the flex-grow class', () => {
      const wrapper = shallow(<Grid item xs />);
      assert.strictEqual(wrapper.hasClass(classes['grid-xs-true']), true);
    });

    it('should apply the flex size class', () => {
      const wrapper = shallow(<Grid item xs={3} />);
      assert.strictEqual(wrapper.hasClass(classes['grid-xs-3']), true);
    });

    it('should apply the flex auto class', () => {
      const wrapper = shallow(<Grid item xs="auto" />);
      assert.strictEqual(wrapper.hasClass(classes['grid-xs-auto']), true);
    });
  });

  describe('prop: spacing', () => {
    it('should have a spacing', () => {
      const wrapper = shallow(<Grid container spacing={1} />);
      assert.strictEqual(wrapper.hasClass(classes['spacing-xs-1']), true);
    });
  });

  describe('prop: spacingXs', () => {
    it('should have a spacing for xs breakpoint', () => {
      const wrapper = shallow(<Grid container spacingXs={1} />);
      assert.strictEqual(wrapper.hasClass(classes['spacing-xs-1']), true);
    });
  });

  describe('prop: spacingSm', () => {
    it('should have a spacing for sm breakpoint', () => {
      const wrapper = shallow(<Grid container spacingSm={1} />);
      assert.strictEqual(wrapper.hasClass(classes['spacing-sm-1']), true);
    });
  });

  describe('prop: spacingMd', () => {
    it('should have a spacing for md breakpoint', () => {
      const wrapper = shallow(<Grid container spacingMd={1} />);
      assert.strictEqual(wrapper.hasClass(classes['spacing-md-1']), true);
    });
  });

  describe('prop: spacingLg', () => {
    it('should have a spacing for lg breakpoint', () => {
      const wrapper = shallow(<Grid container spacingLg={1} />);
      assert.strictEqual(wrapper.hasClass(classes['spacing-lg-1']), true);
    });
  });

  describe('prop: spacingXl', () => {
    it('should have a spacing for xl breakpoint', () => {
      const wrapper = shallow(<Grid container spacingXl={1} />);
      assert.strictEqual(wrapper.hasClass(classes['spacing-xl-1']), true);
    });
  });

  describe('prop: alignItems', () => {
    it('should apply the align-item class', () => {
      const wrapper = shallow(<Grid alignItems="center" container />);
      assert.strictEqual(wrapper.hasClass(classes['align-items-xs-center']), true);
    });
  });

  describe('prop: alignContent', () => {
    it('should apply the align-content class', () => {
      const wrapper = shallow(<Grid alignContent="center" container />);
      assert.strictEqual(wrapper.hasClass(classes['align-content-xs-center']), true);
    });
  });

  describe('prop: justify', () => {
    it('should apply the justify class', () => {
      const wrapper = shallow(<Grid justify="space-evenly" container />);
      assert.strictEqual(wrapper.hasClass(classes['justify-xs-space-evenly']), true);
    });
  });

  describe('prop: other', () => {
    it('should spread the other props to the root element', () => {
      const handleClick = () => {};
      const wrapper = shallow(<Grid component="span" onClick={handleClick} />);
      assert.strictEqual(wrapper.props().onClick, handleClick);
    });
  });

  describe('gutter', () => {
    it('should generate the right values', () => {
      const defaultTheme = createMuiTheme();
      const remTheme = createMuiTheme({
        spacing: factor => `${0.25 * factor}rem`,
      });

      expect(styles(remTheme)['spacing-xs-2']).to.deep.equal({
        margin: '-0.25rem',
        width: 'calc(100% + 0.5rem)',
        '& > $item': { padding: '0.25rem' },
      });
      expect(styles(defaultTheme)['spacing-xs-2']).to.deep.equal({
        margin: '-8px',
        width: 'calc(100% + 16px)',
        '& > $item': { padding: '8px' },
      });
    });
  });
});
