import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface TimelineConnectorClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TimelineConnectorClassKey = keyof TimelineConnectorClasses;

export function getTimelineConnectorUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTimelineConnector', slot);
}

export const getTimelineConnectorClasses = (): TimelineConnectorClasses => generateUtilityClasses(
  'MuiTimelineConnector',
  ['root'],
);

const timelineConnectorClasses = getTimelineConnectorClasses();

export default timelineConnectorClasses;
