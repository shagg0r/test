'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { elementTypeAcceptingRef, refType, unstable_useForkRef as useForkRef } from '@mui/utils';
import {
  EventHandlers,
  unstable_composeClasses as composeClasses,
  useButton,
  useSlotProps,
} from '@mui/base';
import { OverridableComponent } from '@mui/types';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import TouchRipple from '../Button/TouchRipple';
import useTouchRipple from '../Button/useTouchRipple';
import buttonBaseClasses, { getButtonBaseUtilityClass } from './buttonBaseClasses';
import { ButtonBaseOwnerState, ButtonBaseProps, ButtonBaseTypeMap } from './ButtonBase.types';
import { TouchRippleActions } from '../Button/TouchRipple.types';

const useUtilityClasses = (ownerState: ButtonBaseOwnerState) => {
  const { disabled, focusVisible, focusVisibleClassName, classes } = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible'],
  };

  const composedClasses = composeClasses(slots, getButtonBaseUtilityClass, classes);

  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }

  return composedClasses;
};

export const ButtonBaseRoot = styled('button', {
  name: 'MuiButtonBase',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  boxSizing: 'border-box',
  WebkitTapHighlightColor: 'transparent',
  backgroundColor: 'transparent', // Reset default value
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  border: 0,
  margin: 0, // Remove the margin in Safari
  borderRadius: 0,
  padding: 0, // Remove the padding in Firefox
  userSelect: 'none',
  verticalAlign: 'middle',
  MozAppearance: 'none', // Reset
  WebkitAppearance: 'none', // Reset
  textDecoration: 'none',
  // So we take precedent over the style of a native <a /> element.
  color: 'inherit',
  '&::-moz-focus-inner': {
    borderStyle: 'none', // Remove Firefox dotted outline.
  },
  [`&.${buttonBaseClasses.disabled}`]: {
    pointerEvents: 'none', // Disable link interactions
    cursor: 'default',
  },
  '@media print': {
    colorAdjust: 'exact',
  },
});

/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 *
 * Demos:
 *
 * - [Button](https://mui.com/material-ui/react-button/)
 *
 * API:
 *
 * - [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 */
const ButtonBase = React.forwardRef(function ButtonBase<
  BaseComponentType extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
>(inProps: ButtonBaseProps<BaseComponentType>, ref: React.ForwardedRef<any>) {
  const props = useThemeProps({ props: inProps, name: 'MuiButtonBase' });
  const {
    action,
    centerRipple = false,
    children,
    component = 'button',
    disabled = false,
    disableRipple = false,
    disableTouchRipple = false,
    focusRipple = false,
    focusVisibleClassName,
    focusableWhenDisabled = false,
    onFocusVisible,
    LinkComponent = 'a',
    tabIndex = 0,
    TouchRippleProps,
    type,
    ...other
  } = props;

  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>(null);
  const handleRef = useForkRef(buttonRef, ref);
  const { focusVisible, setFocusVisible, getRootProps } = useButton({
    disabled,
    focusableWhenDisabled,
    href: props.href,
    to: props.to,
    onFocusVisible,
    tabIndex,
    type,
    rootRef: handleRef,
  });

  let ComponentProp = component;
  if (ComponentProp === 'button' && (other.href || other.to)) {
    ComponentProp = LinkComponent;
  }

  const rippleRef = React.useRef<TouchRippleActions>(null);
  const { enableTouchRipple, getRippleHandlers } = useTouchRipple({
    disabled,
    disableRipple,
    disableTouchRipple,
    rippleRef,
  });

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current!.focus();
      },
    }),
    [setFocusVisible],
  );

  const ownerState = {
    ...props,
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    tabIndex,
    focusVisible,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: ButtonBaseRoot,
    getSlotProps: (otherHandlers: EventHandlers) => ({
      tabIndex,
      ...getRootProps({
        ...otherHandlers,
        ...getRippleHandlers(props),
      }),
    }),
    externalForwardedProps: other,
    externalSlotProps: {},
    additionalProps: {
      as: ComponentProp,
    },
    ownerState,
    className: classes.root,
  });

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (enableTouchRipple && !rippleRef.current) {
        console.error(
          [
            'Material-UI: The `component` prop provided to ButtonBase is invalid.',
            'Please make sure the children prop is rendered in this custom component.',
          ].join('\n'),
        );
      }
    }, [enableTouchRipple]);
  }

  return (
    <ButtonBaseRoot {...rootProps}>
      {children}
      {enableTouchRipple ? (
        /* TouchRipple is only needed client-side, x2 boost on the server. */
        <TouchRipple center={centerRipple} {...TouchRippleProps} ref={rippleRef} />
      ) : null}
    </ButtonBaseRoot>
  );
}) as OverridableComponent<ButtonBaseTypeMap>;

ButtonBase.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: refType,
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: PropTypes.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: PropTypes.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: PropTypes.elementType,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: PropTypes.func,
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: PropTypes.object,
  /**
   * @ignore
   */
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
} as any;

export default ButtonBase;
