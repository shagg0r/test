import { generateUtilityClasses, generateUtilityClass } from '@mui/core';

export interface FormControlClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `margin="normal"`. */
  marginNormal: string;
  /** Styles applied to the root element if `margin="dense"`. */
  marginDense: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
}

export type FormControlClassKey = keyof FormControlClasses;

export function getFormControlUtilityClasses(slot: string): string {
  return generateUtilityClass('MuiFormControl', slot);
}

export const getFormControlClasses = (): FormControlClasses =>
  generateUtilityClasses('MuiFormControl', [
    'root',
    'marginNone',
    'marginNormal',
    'marginDense',
    'fullWidth',
    'disabled',
  ]);

const formControlClasses = getFormControlClasses();

export default formControlClasses;
