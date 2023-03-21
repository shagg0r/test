import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { UseTabsListRootSlotProps } from '../useTabsList';
import { SlotComponentProps } from '../utils';

export interface TabsListUnstyledRootSlotPropsOverrides {}

export interface TabsListUnstyledOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  className?: string;
  /**
   * The props used for each slot inside the TabsList.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<
      'div',
      TabsListUnstyledRootSlotPropsOverrides,
      TabsListUnstyledOwnerState
    >;
  };
  /**
   * The components used for each slot inside the TabsList.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: TabsListUnstyledSlots;
}

export interface TabsListUnstyledSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export interface TabsListUnstyledTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & TabsListUnstyledOwnProps;
  defaultComponent: D;
}

export type TabsListUnstyledProps<
  D extends React.ElementType = TabsListUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TabsListUnstyledTypeMap<P, D>, D> & {
  component?: D;
};

export type TabsListUnstyledOwnerState = TabsListUnstyledProps & {
  isRtl: boolean;
  orientation: 'horizontal' | 'vertical';
};

export type TabsListUnstyledRootSlotProps = UseTabsListRootSlotProps & {
  className?: string;
  ownerState: TabsListUnstyledOwnerState;
};
