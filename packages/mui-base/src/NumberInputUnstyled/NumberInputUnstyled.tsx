import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { getNumberInputUnstyledUtilityClass } from './numberInputUnstyledClasses';
import useNumberInput from '../useNumberInput';
import {
  NumberInputUnstyledOwnerState,
  NumberInputUnstyledProps,
  NumberInputUnstyledRootSlotProps,
  NumberInputUnstyledInputSlotProps,
  NumberInputUnstyledIncrementButtonSlotProps,
  NumberInputUnstyledDecrementButtonSlotProps,
  NumberInputUnstyledTypeMap,
} from './NumberInputUnstyled.types';
import composeClasses from '../composeClasses';
import { EventHandlers, useSlotProps, WithOptionalOwnerState } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

const useUtilityClasses = (ownerState: NumberInputUnstyledOwnerState) => {
  const { disabled, error, focused, formControlContext, isIncrementDisabled, isDecrementDisabled } =
    ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      error && 'error',
      focused && 'focused',
      Boolean(formControlContext) && 'formControl',
    ],
    input: ['input', disabled && 'disabled'],
    incrementButton: ['incrementButton', isIncrementDisabled && 'disabled'],
    decrementButton: ['decrementButton', isDecrementDisabled && 'disabled'],
  };

  return composeClasses(slots, useClassNamesOverride(getNumberInputUnstyledUtilityClass));
};

/**
 *
 * Demos:
 *
 * - [Unstyled Number Input](https://mui.com/base/react-number-input/)
 *
 * API:
 *
 * - [NumberInputUnstyled API](https://mui.com/base/react-number-input/components-api/#number-input-unstyled)
 */
const NumberInputUnstyled = React.forwardRef(function NumberInputUnstyled(
  props: NumberInputUnstyledProps,
  forwardedRef: React.ForwardedRef<any>,
) {
  const {
    className,
    component,
    defaultValue,
    disabled,
    error,
    id,
    max,
    min,
    onBlur,
    onChange,
    onFocus,
    onValueChange,
    placeholder,
    required,
    step,
    value,
    slotProps = {},
    slots = {},
    ...rest
  } = props;

  const {
    getRootProps,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    focused,
    error: errorState,
    disabled: disabledState,
    formControlContext,
    isIncrementDisabled,
    isDecrementDisabled,
  } = useNumberInput({
    min,
    max,
    step,
    defaultValue,
    disabled,
    error,
    onFocus,
    onChange,
    onBlur,
    onValueChange,
    required,
    value,
  });

  const ownerState: NumberInputUnstyledOwnerState = {
    ...props,
    disabled: disabledState,
    error: errorState,
    focused,
    formControlContext,
    isIncrementDisabled,
    isDecrementDisabled,
  };

  const classes = useUtilityClasses(ownerState);

  const propsForwardedToInputSlot = {
    id,
    placeholder,
  };

  const Root = component ?? slots.root ?? 'div';
  const rootProps: WithOptionalOwnerState<NumberInputUnstyledRootSlotProps> = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: rest,
    additionalProps: {
      ref: forwardedRef,
    },
    ownerState,
    className: [classes.root, className],
  });

  const Input = slots.input ?? 'input';
  const inputProps: WithOptionalOwnerState<NumberInputUnstyledInputSlotProps> = useSlotProps({
    elementType: Input,
    getSlotProps: (otherHandlers: EventHandlers) =>
      getInputProps({ ...otherHandlers, ...propsForwardedToInputSlot }),
    externalSlotProps: slotProps.input,
    // additionalProps: {},
    ownerState,
    className: classes.input,
  });

  const IncrementButton = slots.incrementButton ?? 'button';
  const incrementButtonProps: WithOptionalOwnerState<NumberInputUnstyledIncrementButtonSlotProps> =
    useSlotProps({
      elementType: IncrementButton,
      getSlotProps: getIncrementButtonProps,
      externalSlotProps: slotProps.incrementButton,
      ownerState,
      className: classes.incrementButton,
    });

  const DecrementButton = slots.decrementButton ?? 'button';
  const decrementButtonProps: WithOptionalOwnerState<NumberInputUnstyledDecrementButtonSlotProps> =
    useSlotProps({
      elementType: DecrementButton,
      getSlotProps: getDecrementButtonProps,
      externalSlotProps: slotProps.decrementButton,
      // additionalProps: {},
      ownerState,
      className: classes.decrementButton,
    });

  return (
    <Root {...rootProps}>
      <DecrementButton {...decrementButtonProps} />
      <Input {...inputProps} />
      <IncrementButton {...incrementButtonProps} />
    </Root>
  );
}) as OverridableComponent<NumberInputUnstyledTypeMap>;

NumberInputUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `Mui-error` class on the root element.
   */
  error: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * The maximum value.
   */
  max: PropTypes.number,
  /**
   * The minimum value.
   */
  min: PropTypes.number,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired after the value is clamped and changes.
   * Called with `undefined` when the value is unset.
   */
  onValueChange: PropTypes.func,
  /**
   * @ignore
   */
  placeholder: PropTypes.string,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
  /**
   * The props used for each slot inside the NumberInput.
   * @default {}
   */
  slotProps: PropTypes.shape({
    decrementButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    incrementButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    decrementButton: PropTypes.elementType,
    incrementButton: PropTypes.elementType,
    input: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * The amount that the value changes on each increment or decrement.
   */
  step: PropTypes.number,
  /**
   * The current value. Use when the component is controlled.
   */
  value: PropTypes.any,
} as any;

export default NumberInputUnstyled;
