import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { FormLabelProps } from '../FormLabel';

export interface InputLabelProps extends StandardProps<FormLabelProps> {
  /**
   * The contents of the `InputLabel`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    focused?: string;
    disabled?: string;
    error?: string;
    required?: string;
    asterisk?: string;
    formControl?: string;
    marginDense?: string;
    shrink?: string;
    animated?: string;
    filled?: string;
    outlined?: string;
  };
  color?: FormLabelProps['color'];
  /**
   * If `true`, the transition animation is disabled.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * If `true`, apply disabled class.
   */
  disabled?: boolean;
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error?: boolean;
  /**
   * If `true`, the input of this label is focused.
   */
  focused?: boolean;
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin?: 'dense';
  /**
   * if `true`, the label will indicate that the input is required.
   */
  required?: boolean;
  /**
   * If `true`, the label is shrunk.
   */
  shrink?: boolean;
  /**
   * The variant to use.
   */
  variant?: 'standard' | 'outlined' | 'filled';
}

export type InputLabelClassKey = keyof NonNullable<InputLabelProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [InputLabel API](https://material-ui.com/api/input-label/)
 * - inherits [FormLabel API](https://material-ui.com/api/form-label/)
 */
export default function InputLabel(props: InputLabelProps): JSX.Element;
