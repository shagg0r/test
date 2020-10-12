import * as React from 'react';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type TabTypeMap<P = {}, D extends React.ElementType = 'div'> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * This prop isn't supported.
     * Use the `component` prop if you need to change the children structure.
     */
    children?: null;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      root?: string;
      labelIcon?: string;
      textColorInherit?: string;
      textColorPrimary?: string;
      textColorSecondary?: string;
      selected?: string;
      disabled?: string;
      fullWidth?: string;
      wrapped?: string;
      wrapper?: string;
    };
    /**
     * If `true`, the tab will be disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, the  keyboard focus ripple will be disabled.
     * @default false
     */
    disableFocusRipple?: boolean;
    /**
     * The icon element.
     */
    icon?: string | React.ReactElement;
    /**
     * The label element.
     */
    label?: React.ReactNode;
    /**
     * You can provide your own value. Otherwise, we fallback to the child position index.
     */
    value?: any;
    /**
     * Tab labels appear in a single row.
     * They can use a second line if needed.
     * @default false
     */
    wrapped?: boolean;
  };
  defaultComponent: D;
}>;

/**
 *
 * Demos:
 *
 * - [Tabs](https://material-ui.com/components/tabs/)
 *
 * API:
 *
 * - [Tab API](https://material-ui.com/api/tab/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const Tab: ExtendButtonBase<TabTypeMap>;

export type TabClassKey = keyof NonNullable<TabTypeMap['props']['classes']>;

export type TabProps<
  D extends React.ElementType = TabTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TabTypeMap<P, D>, D>;

export default Tab;
