import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface SwitchUnstyledClasses {
  /** Class applied to the root element. */
  root: string;
  /** Class applied to the internal input element */
  input: string;
  /** Class applied to the track element */
  track: string;
  /** Class applied to the thumb element */
  thumb: string;
  /** Class applied to the root element if the switch is checked */
  checked: string;
  /** Class applied to the root element if the switch is disabled */
  disabled: string;
  /** Class applied to the root element if the switch has visible focus */
  focusVisible: string;
  /** Class applied to the root element if the switch is read-only */
  readOnly: string;
}

export type SwitchUnstyledClassKey = keyof SwitchUnstyledClasses;

export function getSwitchUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSwitch', slot);
}

export const getSwitchUnstyledClasses = (): SwitchUnstyledClasses =>
  generateUtilityClasses('MuiSwitch', [
    'root',
    'input',
    'track',
    'thumb',
    'checked',
    'disabled',
    'focusVisible',
    'readOnly',
  ]);

const switchUnstyledClasses = getSwitchUnstyledClasses();

export default switchUnstyledClasses;
