import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface StepContentClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `last={true}` (controlled by `Step`). */
  last: string;
  /** Styles applied to the Transition component. */
  transition: string;
}

export type StepContentClassKey = keyof StepContentClasses;

export function getStepContentUtilityClass(slot: string): string {
  return generateUtilityClass('MuiStepContent', slot);
}

export const getStepContentClasses = (): StepContentClasses =>
  generateUtilityClasses('MuiStepContent', ['root', 'last', 'transition']);

const stepContentClasses = getStepContentClasses();

export default stepContentClasses;
