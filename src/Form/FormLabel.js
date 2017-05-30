// @flow weak
/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiFormLabel', theme => {
  const focusColor = theme.palette.primary[theme.palette.type === 'light' ? 'A700' : 'A200'];
  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.input.labelText,
      lineHeight: 1,
    },
    focused: {
      color: focusColor,
    },
    error: {
      color: theme.palette.error.A400,
    },
    disabled: {
      color: theme.palette.input.disabled,
    },
  };
});

function FormLabel(props, context) {
  const {
    children,
    classes,
    className: classNameProp,
    disabled: disabledProp,
    error: errorProp,
    focused: focusedProp,
    required: requiredProp,
    ...other
  } = props;

  const { muiFormControl } = context;

  let required = requiredProp;
  let focused = focusedProp;
  let disabled = disabledProp;
  let error = errorProp;

  if (muiFormControl) {
    if (typeof required === 'undefined') {
      required = muiFormControl.required;
    }
    if (typeof focused === 'undefined') {
      focused = muiFormControl.focused;
    }
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
    if (typeof error === 'undefined') {
      error = muiFormControl.error;
    }
  }

  const className = classNames(
    classes.root,
    {
      [classes.focused]: focused,
      [classes.disabled]: disabled,
      [classes.error]: error,
    },
    classNameProp,
  );

  const asteriskClassName = classNames({
    [classes.error]: error,
  });

  return (
    <label className={className} {...other}>
      {children}
      {required &&
        <span className={asteriskClassName} data-mui-test="FormLabelAsterisk">
          {'\u2009*'}
        </span>}
    </label>
  );
}

FormLabel.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label should be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: PropTypes.bool,
  /**
   * If `true`, the label will indicate that the input is required.
   */
  required: PropTypes.bool,
};

FormLabel.contextTypes = {
  muiFormControl: PropTypes.object,
};

export default withStyles(styleSheet)(FormLabel);
