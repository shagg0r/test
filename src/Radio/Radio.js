// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { createSwitch } from '../internal/SwitchBase';
import withSwitchLabel from '../internal/withSwitchLabel';
import RadioButtonCheckedIcon from '../svg-icons/radio-button-checked';
import RadioButtonUncheckedIcon from '../svg-icons/radio-button-unchecked';

export const styleSheet = createStyleSheet('MuiRadio', (theme) => {
  return {
    default: {
      color: theme.palette.text.secondary,
    },
    checked: {
      color: theme.palette.accent[500],
    },
    disabled: {
      color: theme.palette.action.disabled,
    },
  };
});

const Radio = createSwitch({
  styleSheet,
  inputType: 'radio',
  defaultIcon: <RadioButtonUncheckedIcon />,
  defaultCheckedIcon: <RadioButtonCheckedIcon />,
});

Radio.displayName = 'Radio';

export default Radio;

const LabelRadio = withSwitchLabel(Radio);

export { LabelRadio };

/**
 * [Radio buttons](https://www.google.com/design/spec/components/selection-controls.html#selection-controls-radio-button)
 * are switches used for selection from multiple options.
 */
export class RadioDocs {
  render() {}
  static propTypes = {
    /**
     * If `true`, the component appears selected.
     */
    checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /**
     * The CSS class name of the root element when checked.
     */
    checkedClassName: PropTypes.string,
    /**
     * The icon to display when the component is checked.
     */
    checkedIcon: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * @ignore
     */
    defaultChecked: PropTypes.bool,
    /**
     * If `true`, the switch will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * The CSS class name of the root element when disabled.
     */
    disabledClassName: PropTypes.string,
    /**
     * The icon to display when the component is unchecked.
     */
    icon: PropTypes.node,
    /*
     * @ignore
     */
    name: PropTypes.string,
    /**
     * Callback function that is fired when the switch is changed.
     *
     * @param {object} event `change` event
     * @param {boolean} checked The `checked` value of the switch
     */
    onChange: PropTypes.func,
    /**
     * If `false`, the ripple effect will be disabled.
     */
    ripple: PropTypes.bool,
    /**
     * @ignore
     */
    tabIndex: PropTypes.string,
    /**
     * The value of the component.
     */
    value: PropTypes.string,
  };
}
