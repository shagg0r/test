import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion, Simplify } from '@mui/types';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { BadgeClasses } from './badgeClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface BadgePropsVariantOverrides {}
export interface BadgePropsColorOverrides {}
export interface BadgeRootSlotPropsOverrides {}
export interface BadgeBadgeSlotPropsOverrides {}

export type BadgeOwnerState = Simplify<
  BadgeOwnProps & {
    badgeContent: React.ReactNode;
    invisible: boolean;
    max: number;
    displayValue: React.ReactNode;
    showZero: boolean;
    anchorOrigin: BadgeOrigin;
    color: OverridableStringUnion<
      'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning',
      BadgePropsColorOverrides
    >;
    overlap: 'rectangular' | 'circular';
    variant: OverridableStringUnion<'standard' | 'dot', BadgePropsVariantOverrides>;
  }
>;
export interface BadgeOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

export interface BadgeOwnProps {
  /**
   * The anchor of the badge.
   * @default {
   *   vertical: 'top',
   *   horizontal: 'right',
   * }
   */
  anchorOrigin?: BadgeOrigin;
  /**
   * The content rendered within the badge.
   */
  badgeContent?: React.ReactNode;
  /**
   * The badge will be added relative to this node.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<BadgeClasses>;
  /**
   * @ignore
   */
  className?: string;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning',
    BadgePropsColorOverrides
  >;
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */

  /**
   * If `true`, the badge is invisible.
   * @default false
   */
  invisible?: boolean;
  /**
   * Max count to show.
   * @default 99
   */
  max?: number;
  /**
   * Wrapped shape the badge should overlap.
   * @default 'rectangular'
   */
  overlap?: 'rectangular' | 'circular';
  /**
   * The props used for each slot inside the Badge.
   * @default {}
   */

  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  showZero?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant?: OverridableStringUnion<'standard' | 'dot', BadgePropsVariantOverrides>;
}

export interface BadgeSlots {
  root?: React.ElementType;
  badge?: React.ElementType;
}

export type BadgeSlotsAndBadgeProps = CreateSlotsAndSlotProps<
  BadgeSlots,
  {
    root: SlotProps<React.ElementType, {}, BadgeOwnerState>;
    badge: SlotProps<React.ElementType, {}, BadgeOwnerState>;
  }
>;

export interface BadgeTypeMap<
  RootComponent extends React.ElementType = 'span',
  AdditionalProps = {},
> {
  props: AdditionalProps & BadgeOwnProps & BadgeSlotsAndBadgeProps;
  defaultComponent: RootComponent;
}

type BadgeRootProps = NonNullable<BadgeTypeMap['props']['slotProps']>['root'];
type BadgeBadgeProps = NonNullable<BadgeTypeMap['props']['slotProps']>['badge'];

export declare const BadgeRoot: React.FC<BadgeRootProps>;
export declare const BadgeMark: React.FC<BadgeBadgeProps>;

/**
 *
 * Demos:
 *
 * - [Avatar](https://mui.com/material-ui/react-avatar/)
 * - [Badge](https://mui.com/material-ui/react-badge/)
 *
 * API:
 *
 * - [Badge API](https://mui.com/material-ui/api/badge/)
 */
declare const Badge: OverridableComponent<BadgeTypeMap>;

export type BadgeProps<
  RootComponent extends React.ElementType = BadgeTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<BadgeTypeMap<RootComponent, AdditionalProps>, RootComponent> & {
  component?: React.ElementType;
};

export default Badge;
