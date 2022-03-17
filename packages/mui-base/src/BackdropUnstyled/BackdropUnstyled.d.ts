import * as React from 'react';
import { OverridableComponent, OverridableTypeMap, OverrideProps } from '@mui/types';

export interface BackdropUnstyledComponentsPropsOverrides {}

export interface BackdropUnstyledTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The components used for each slot inside the Backdrop.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    components?: {
      Root?: React.ElementType;
    };
    /**
     * The props used for each slot inside the Backdrop.
     * @default {}
     */
    componentsProps?: {
      root?: React.HTMLAttributes<HTMLDivElement> & BackdropUnstyledComponentsPropsOverrides;
    };
  };
  defaultComponent: D;
}

/**
 * Utility to create component types that inherit props from BackdropUnstyled.
 */
export interface ExtendBackdropUnstyledTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & BackdropUnstyledTypeMap['props'] & { component?: React.ElementType };
  defaultComponent: M['defaultComponent'];
}

export type ExtendBackdropUnstyled<M extends OverridableTypeMap> = OverridableComponent<
  ExtendBackdropUnstyledTypeMap<M>
>;

/**
 *
 * Demos:
 *
 * - [Backdrop](https://mui.com/components/backdrop/)
 *
 * API:
 *
 * - [BackdropUnstyled API](https://mui.com/api/backdrop-unstyled/)
 */
declare const BackdropUnstyled: OverridableComponent<BackdropUnstyledTypeMap>;

export type BackdropUnstyledProps<
  D extends React.ElementType = BackdropUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<BackdropUnstyledTypeMap<P, D>, D>;

export default BackdropUnstyled;
