import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformance } from 'test/utils';
import InputBase from '@mui/material/InputBase';
import Input, { inputClasses as classes } from '@mui/material/Input';

describe('<Input />', () => {
  const render = createClientRender();

  describeConformance(<Input />, () => ({
    classes,
    inheritComponent: InputBase,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiInput',
    testDeepOverrides: { slotName: 'input', slotClassName: classes.input },
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should forward classes to InputBase', () => {
    render(<Input error classes={{ error: 'error' }} />);
    expect(document.querySelector('.error')).not.to.equal(null);
  });

  it('should respects the componentsProps if passed', () => {
    render(<Input componentsProps={{ root: { 'data-test': 'test' } }} />);
    expect(document.querySelector('[data-test=test]')).not.to.equal(null);
  });
});
