import { Context } from 'react';
import { FormControlProps } from './FormControl';

// shut off automatic exporting
export {};

type ContextFromPropsKey = 'disabled' | 'error' | 'hiddenLabel' | 'margin' | 'required' | 'variant';

export interface FormControlState extends Pick<FormControlProps, ContextFromPropsKey> {
  adornedStart: boolean;
  filled: boolean;
  focused: boolean;
  onBlur: () => void;
  onEmpty: () => void;
  onFilled: () => void;
  onFocus: () => void;
  onRegister: () => () => void;
}

export default function useFormControl(): FormControlState;
