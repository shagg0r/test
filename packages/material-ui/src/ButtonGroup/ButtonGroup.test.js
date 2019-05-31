import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import Button from '../Button';
import ButtonGroup from './ButtonGroup';

describe('<ButtonGroup />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<ButtonGroup><Button>Conformance?</Button></ButtonGroup>, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));

  it('renders with the root class but no others', () => {
    const wrapper = mount(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const buttonGroup = wrapper.find('div')
    assert.strictEqual(buttonGroup.hasClass(classes.root), true);
    assert.strictEqual(buttonGroup.hasClass(classes.contained), false);
    assert.strictEqual(buttonGroup.hasClass(classes.fullWidth), false);
  });

  // it('overwrites the root class', () => {
  //   const rootClassName = 'testRootClassName';
  //   const wrapper = mount(
  //     <ButtonGroup classes={{ badge: rootClassName }}>
  //       <Button>Hello World</Button>
  //     </ButtonGroup>,
  //   );

  //   assert.strictEqual(findBG(wrapper).hasClass(rootClassName), true);
  // });

  it('should render an outlined button', () => {
    const wrapper = mount(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = wrapper.find('button');
    assert.strictEqual(button.hasClass('MuiButton-outlined'), true);
    assert.strictEqual(button.hasClass(classes.grouped), true);
    assert.strictEqual(button.hasClass(classes.groupedOutlined), true);
    assert.strictEqual(button.hasClass(classes.groupedOutlinedPrimary), false);
    assert.strictEqual(button.hasClass(classes.groupedOutlinedSecondary), false);
  });

  it('should render an outlined primary button', () => {
    const wrapper = mount(
      <ButtonGroup color="primary">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = wrapper.find('div').find('button');
    assert.strictEqual(button.hasClass('MuiButton-outlinedPrimary'), true);
    assert.strictEqual(button.hasClass(classes.grouped), true);
    assert.strictEqual(button.hasClass(classes.groupedOutlined), true);
    assert.strictEqual(button.hasClass(classes.groupedOutlinedPrimary), true);
    assert.strictEqual(button.hasClass(classes.groupedOutlinedSecondary), false);
  });

  it('should render an outlined secondary button', () => {
    const wrapper = mount(
      <ButtonGroup color="secondary">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = wrapper.find('button');
    assert.strictEqual(button.hasClass('MuiButton-outlinedSecondary'), true);
    assert.strictEqual(button.hasClass(classes.grouped), true);
    assert.strictEqual(button.hasClass(classes.groupedOutlined), true);
    assert.strictEqual(button.hasClass(classes.groupedOutlinedPrimary), false);
    assert.strictEqual(button.hasClass(classes.groupedOutlinedSecondary), true);
  });

  it('should render a contained button', () => {
    const wrapper = mount(
      <ButtonGroup variant="contained">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = wrapper.find('button');
    assert.strictEqual(button.hasClass('MuiButton-contained'), true);
    assert.strictEqual(button.hasClass(classes.grouped), true);
    assert.strictEqual(button.hasClass(classes.groupedContained), true);
    assert.strictEqual(button.hasClass(classes.groupedContainedPrimary), false);
    assert.strictEqual(button.hasClass(classes.groupedContainedSecondary), false);
  });

  it('should render a contained primary button', () => {
    const wrapper = mount(
      <ButtonGroup variant="contained" color="primary">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = wrapper.find('button');
    assert.strictEqual(button.hasClass('MuiButton-containedPrimary'), true);
    assert.strictEqual(button.hasClass(classes.grouped), true);
    assert.strictEqual(button.hasClass(classes.groupedContained), true);
    assert.strictEqual(button.hasClass(classes.groupedContainedPrimary), true);
    assert.strictEqual(button.hasClass(classes.groupedContainedSecondary), false);
  });

  it('should render a contained secondary button', () => {
    const wrapper = mount(
      <ButtonGroup variant="contained" color="secondary">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = wrapper.find('button');
    assert.strictEqual(button.hasClass('MuiButton-containedSecondary'), true);
    assert.strictEqual(button.hasClass(classes.grouped), true);
    assert.strictEqual(button.hasClass(classes.groupedContained), true);
    assert.strictEqual(button.hasClass(classes.groupedContainedPrimary), false);
    assert.strictEqual(button.hasClass(classes.groupedContainedSecondary), true);
  });

  it('should render a small button', () => {
    const wrapper = mount(
      <ButtonGroup size="small">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = wrapper.find('button');
    assert.strictEqual(button.hasClass('MuiButton-sizeSmall'), true);
  });

  it('should render a large button', () => {
    const wrapper = mount(
      <ButtonGroup size="large">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = wrapper.find('button');
    assert.strictEqual(button.hasClass('MuiButton-sizeLarge'), true);
  });

  it('should have a ripple by default', () => {
    const wrapper = mount(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    assert.strictEqual(wrapper.find('TouchRipple').exists(), true);
  });

  it('can disable the ripple', () => {
    const wrapper = mount(
      <ButtonGroup disableRipple>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    assert.strictEqual(wrapper.find('TouchRipple').exists(), false);
  });

  it('should not be fullWidth by default', () => {
    const wrapper = mount(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = wrapper.find('button');
    assert.strictEqual(wrapper.hasClass(classes.fullWidth), false);
    assert.strictEqual(button.hasClass('MuiButton-fullWidth'), false);
  });

  it('should pass fullWidth to Button', () => {
    const wrapper = mount(
      <ButtonGroup fullWidth>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const buttonGroup = wrapper.find('div')
    const button = wrapper.find('button');
    assert.strictEqual(buttonGroup.hasClass(classes.fullWidth), true);
    assert.strictEqual(button.hasClass('MuiButton-fullWidth'), true);
  });
});
