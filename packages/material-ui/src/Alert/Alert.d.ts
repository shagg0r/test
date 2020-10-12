import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { InternalStandardProps as StandardProps } from '..';
import { PaperProps } from '../Paper';

export type Color = 'success' | 'info' | 'warning' | 'error';

export interface AlertPropsVariantOverrides {}
export type AlertVariantDefaults = Record<'standard' | 'filled' | 'outlined', true>;

export interface AlertProps extends StandardProps<PaperProps, 'variant'> {
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    filled?: string;
    outlined?: string;
    standard?: string;
    standardSuccess?: string;
    standardInfo?: string;
    standardWarning?: string;
    standardError?: string;
    outlinedSuccess?: string;
    outlinedInfo?: string;
    outlinedWarning?: string;
    outlinedError?: string;
    filledSuccess?: string;
    filledInfo?: string;
    filledWarning?: string;
    filledError?: string;
    icon?: string;
    message?: string;
    action?: string;
  };
  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Close'
   */
  closeText?: string;
  /**
   * The main color for the alert. Unless provided, the value is taken from the `severity` prop.
   */
  color?: Color;
  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity?: Color;
  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   */
  icon?: React.ReactNode | false;
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role?: string;
  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping?: Partial<Record<Color, React.ReactNode>>;
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   *
   * @param {object} event The event source of the callback.
   */
  onClose?: (event: React.SyntheticEvent) => void;
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant?: OverridableStringUnion<AlertVariantDefaults, AlertPropsVariantOverrides>;
}

export type AlertClassKey = keyof NonNullable<AlertProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Alert](https://material-ui.com/components/alert/)
 *
 * API:
 *
 * - [Alert API](https://material-ui.com/api/alert/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
export default function Alert(props: AlertProps): JSX.Element;
