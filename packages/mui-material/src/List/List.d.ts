import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverridableTypeMap, OverrideProps } from '../OverridableComponent';
import { ListClasses } from './listClasses';

export interface ListPropsVariantOverrides {}

export interface ListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ListClasses>;
    /**
     * If `true`, compact vertical padding designed for keyboard and mouse input is used for
     * the list and list items.
     * The prop is available to descendant components as the `dense` context.
     * @default false
     */
    dense?: boolean;
    /**
     * If `true`, vertical padding is removed from the list.
     * @default false
     */
    disablePadding?: boolean;
    /**
     * The content of the subheader, normally `ListSubheader`.
     */
    subheader?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The custom variant to use for styling. There are no variants available by default.
     *
     * Customization guide:
     * - https://mui.com/material-ui/customization/theme-components/#global-style-overrides
     * - https://mui.com/material-ui/customization/theme-components/#creating-new-component-variants
     */
    variant?: OverridableStringUnion<never, ListPropsVariantOverrides>;
  };
  defaultComponent: D;
}

/**
 * utility to create component types that inherit props from List.
 */
export interface ExtendListTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & Omit<ListTypeMap['props'], 'variant'>;
  defaultComponent: M['defaultComponent'];
}

export type ExtendList<M extends OverridableTypeMap> = OverridableComponent<ExtendListTypeMap<M>>;

/**
 *
 * Demos:
 *
 * - [Lists](https://mui.com/material-ui/react-list/)
 * - [Transfer list](https://mui.com/material-ui/react-transfer-list/)
 *
 * API:
 *
 * - [List API](https://mui.com/material-ui/api/list/)
 */
declare const List: ExtendList<ListTypeMap>;

export type ListProps<
  D extends React.ElementType = ListTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<ListTypeMap<P, D>, D>;

export default List;
