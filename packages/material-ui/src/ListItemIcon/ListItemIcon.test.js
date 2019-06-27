import React from 'react';
import { assert } from 'chai';
import { createMount, createShallow, getClasses, findOutermostIntrinsic } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import ListItemIcon from './ListItemIcon';

describe('<ListItemIcon />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(
      <ListItemIcon>
        <span />
      </ListItemIcon>,
    );
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(
    <ListItemIcon>
      <div />
    </ListItemIcon>,
    () => ({
      classes,
      inheritComponent: 'div',
      mount,
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp'],
    }),
  );

  it('should render a span inside a div', () => {
    const wrapper = shallow(
      <ListItemIcon>
        <span />
      </ListItemIcon>,
    );
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.children().name(), 'span');
  });

  it('should not use alignItemsFlexStart class when the align-items different from flex start', () => {
    React.createContext({
      alignItems: 'flex-start'
    });
    const wrapper = shallow(
      <ListItemIcon>
        <span />
      </ListItemIcon>,
    );

    assert.equal(findOutermostIntrinsic(wrapper).hasClass(classes.alignItemsFlexStart), false);
  });
});
