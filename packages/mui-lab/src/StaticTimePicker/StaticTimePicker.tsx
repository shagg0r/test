import * as React from 'react';
import {
  StaticTimePicker as XStaticTimePicker,
  StaticTimePickerProps,
} from '@mui/x-date-pickers/StaticTimePicker';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The StaticTimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`',
        'The import from `@mui/lab` will be removed in the first release of July 2022.',
        '',
        "You should use `import { StaticTimePicker } from '@mui/x-date-pickers'`",
        "or `import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type StaticTimePickerComponent = (<TDate>(
  props: StaticTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const StaticTimePicker = React.forwardRef(function DeprecatedStaticTimePicker<TDate>(
  props: StaticTimePickerProps<TDate>,
) {
  warn();

  return <XStaticTimePicker {...props} />;
}) as StaticTimePickerComponent;

export default StaticTimePicker;
