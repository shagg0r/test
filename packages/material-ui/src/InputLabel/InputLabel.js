import * as React from 'react';
import PropTypes from 'prop-types';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import FormLabel, { formLabelClasses } from '../FormLabel';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled, { shouldForwardProp } from '../styles/experimentalStyled';
import { getInputLabelUtilityClasses } from './inputLabelClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;
  return deepmerge(styles.root, {
    ...(!styleProps.formControl && styles.formControl),
    ...(styleProps.size === 'small' && styles.sizeSmall),
    ...(styleProps.shrink && styles.shrink),
    ...(!styleProps.disableAnimation && styles.animated),
    ...styles[styleProps.variant],
    [`& .${formLabelClasses.asterisk}`]: styles.asterisk,
  });
};

const useUtilityClasses = (styleProps) => {
  const { classes, formControl, size, shrink, disableAnimation, variant } = styleProps;
  const slots = {
    root: [
      'root',
      formControl && 'formControl',
      !disableAnimation && 'animated',
      shrink && 'shrink',
      size === 'small' && 'sizeSmall',
      variant,
    ],
  };

  const composedClasses = composeClasses(slots, getInputLabelUtilityClasses, classes);

  return {
    ...classes, // forward the focused, disabled, etc. classes to the FormLabel
    ...composedClasses,
  };
};

const InputLabelRoot = experimentalStyled(
  FormLabel,
  { shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'classes' },
  { name: 'MuiInputLabel', slot: 'Root', overridesResolver },
)(({ theme, styleProps }) => ({
  display: 'block',
  transformOrigin: 'top left',
  ...(styleProps.formControl && {
    position: 'absolute',
    left: 0,
    top: 0,
    // slight alteration to spec spacing to match visual spec result
    transform: 'translate(0, 24px) scale(1)',
  }),
  ...(styleProps.size === 'small' && {
    // Compensation for the `Input.inputSizeSmall` style.
    transform: 'translate(0, 21px) scale(1)',
  }),
  ...(styleProps.shrink && {
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
  }),
  ...(!styleProps.disableAnimation && {
    transition: theme.transitions.create(['color', 'transform'], {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut,
    }),
  }),
  ...(styleProps.variant === 'filled' && {
    // Chrome's autofill feature gives the input field a yellow background.
    // Since the input field is behind the label in the HTML tree,
    // the input field is drawn last and hides the label with an opaque background color.
    // zIndex: 1 will raise the label above opaque background-colors of input.
    zIndex: 1,
    pointerEvents: 'none',
    transform: 'translate(12px, 20px) scale(1)',
    ...(styleProps.size === 'small' && {
      transform: 'translate(12px, 17px) scale(1)',
    }),
    ...(styleProps.shrink && {
      transform: 'translate(12px, 10px) scale(0.75)',
      ...(styleProps.size === 'small' && {
        transform: 'translate(12px, 7px) scale(0.75)',
      }),
    }),
  }),
  ...(styleProps.variant === 'outlined' && {
    // see comment above on filled.zIndex
    zIndex: 1,
    pointerEvents: 'none',
    transform: 'translate(14px, 20px) scale(1)',
    ...(styleProps.size === 'small' && {
      transform: 'translate(14px, 12px) scale(1)',
    }),
    ...(styleProps.shrink && {
      transform: 'translate(14px, -6px) scale(0.75)',
    }),
  }),
}));

const InputLabel = React.forwardRef(function InputLabel(inProps, ref) {
  const props = useThemeProps({ name: 'MuiInputLabel', props: inProps });
  const { disableAnimation = false, margin, shrink: shrinkProp, variant, ...other } = props;

  const muiFormControl = useFormControl();

  let shrink = shrinkProp;
  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
  }

  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['size', 'variant'],
  });

  const styleProps = {
    ...props,
    disableAnimation,
    formControl: muiFormControl,
    shrink,
    size: fcs.size,
    variant: fcs.variant,
  };

  const classes = useUtilityClasses(styleProps);
  return (
    <InputLabelRoot
      data-shrink={shrink}
      styleProps={styleProps}
      ref={ref}
      {...other}
      classes={classes}
    />
  );
});

InputLabel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * If `true`, the transition animation is disabled.
   * @default false
   */
  disableAnimation: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the `input` of this label is focused.
   */
  focused: PropTypes.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(['dense']),
  /**
   * if `true`, the label will indicate that the `input` is required.
   */
  required: PropTypes.bool,
  /**
   * If `true`, the label is shrunk.
   */
  shrink: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

export default InputLabel;
