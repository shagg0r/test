import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface ButtonUnstyledClasses {
  root: string;
  active: string;
  disabled: string;
  focusVisible: string;
}

export type ButtonUnstyledClassKey = keyof ButtonUnstyledClasses;

export function getButtonUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('ButtonUnstyled', slot);
}

export const getButtonUnstyledClasses = (): ButtonUnstyledClasses =>
  generateUtilityClasses('ButtonUnstyled', ['root', 'active', 'disabled', 'focusVisible']);

const buttonUnstyledClasses = getButtonUnstyledClasses();

export default buttonUnstyledClasses;
