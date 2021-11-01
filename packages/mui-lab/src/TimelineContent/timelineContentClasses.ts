import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface TimelineContentClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `position="right"`. */
  positionRight: string;
  /** Styles applied to the root element if `position="left"`. */
  positionLeft: string;
  /** Styles applied to the root element if `position="alternate"`. */
  positionAlternate: string;
}

export type TimelineContentClassKey = keyof TimelineContentClasses;

export function getTimelineContentUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTimelineContent', slot);
}

export const getTimelineContentClasses = (): TimelineContentClasses =>
  generateUtilityClasses('MuiTimelineContent', [
    'root',
    'positionLeft',
    'positionRight',
    'positionAlternate',
  ]);

const timelineContentClasses = getTimelineContentClasses();

export default timelineContentClasses;
