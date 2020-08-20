import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import MuiTextField from '@material-ui/core/TextField';

const inputSyleMapping = {
  small: 'inputSizeSmall',
  medium: 'inputSizeMedium',
  large: 'inputSizeLarge',
  xlarge: 'inputSizeXlarge',
};

const styles = (theme) => ({
  root: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    minWidth: theme.spacing(6),
    backgroundColor: theme.palette.common.white,
    '&$disabled': {
      backgroundColor: theme.palette.divider,
    },
  },
  inputBorder: {
    border: '1px solid #e9ddd0',
    '&:focus': {
      borderColor: theme.palette.secondary.main,
    },
  },
  disabled: {},
  [inputSyleMapping['small']]: {
    fontSize: 14,
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(2)}px)`,
  },
  [inputSyleMapping['medium']]: {
    fontSize: 16,
    padding: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(4)}px)`,
  },
  [inputSyleMapping['large']]: {
    fontSize: 18,
    padding: 22,
    width: `calc(100% - ${22 * 2}px)`,
  },
  [inputSyleMapping['xlarge']]: {
    fontSize: 20,
    padding: 25,
    width: `calc(100% - ${25 * 2}px)`,
  },
  formLabel: {
    fontSize: 18,
  },
  select: {
    height: 'auto',
    borderRadius: 0,
  },
  selectIcon: {
    top: '50%',
    marginTop: -12,
  },
});

function TextField(props) {
  const {
    classes,
    InputProps = {},
    InputLabelProps,
    noBorder = false,
    size,
    SelectProps,
    ...other
  } = props;

  const {
    classes: { input: InputPropsClassesInput, ...InputPropsClassesOther } = {},
    ...InputPropsOther
  } = InputProps;

  const disableUnderline = {
    disableUnderline: true,
  };

  return (
    <MuiTextField
      InputProps={{
        ...disableUnderline,
        classes: {
          root: classes.root,
          input: clsx(
            classes.input,
            classes[inputSyleMapping[size]],
            {
              [classes.inputBorder]: !noBorder,
            },
            InputPropsClassesInput,
          ),
          disabled: classes.disabled,
          ...InputPropsClassesOther,
        },
        ...InputPropsOther,
      }}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
        className: classes.formLabel,
      }}
      SelectProps={{
        ...SelectProps,
        classes: {
          select: classes.select,
          icon: classes.selectIcon,
        },
      }}
      {...other}
    />
  );
}

TextField.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * Props applied to the [`InputLabel`](/api/input-label/) element.
   */
  InputLabelProps: PropTypes.object,
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/api/filled-input/),
   * [`OutlinedInput`](/api/outlined-input/) or [`Input`](/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps: PropTypes.object,
  noBorder: PropTypes.bool,
  /**
   * Props applied to the [`Select`](/api/select/) element.
   */
  SelectProps: PropTypes.object,
  size: PropTypes.oneOf(['large', 'medium', 'small', 'xlarge']),
};

TextField.defaultProps = {
  size: 'medium',
  noBorder: false,
};

export default withStyles(styles)(TextField);
