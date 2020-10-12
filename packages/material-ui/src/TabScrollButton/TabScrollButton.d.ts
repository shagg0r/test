import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export interface TabScrollButtonProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    vertical?: string;
    disabled?: string;
  };
  /**
   * Which direction should the button indicate?
   */
  direction: 'left' | 'right';
  /**
   * If `true`, the element will be disabled.
   */
  disabled?: boolean;
  /**
   * The tabs orientation (layout flow direction).
   */
  orientation: 'horizontal' | 'vertical';
}

export type TabScrollButtonClassKey = keyof NonNullable<TabScrollButtonProps['classes']>;
/**
 *
 * Demos:
 *
 * - [Tabs](https://material-ui.com/components/tabs/)
 *
 * API:
 *
 * - [TabScrollButton API](https://material-ui.com/api/tab-scroll-button/)
 */
export default function TabScrollButton(props: TabScrollButtonProps): JSX.Element;
