import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface TableRowTypeMap<P = {}, D extends React.ElementType = 'tr'> {
  props: P & {
    /**
     * Should be valid <tr> children such as `TableCell`.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      root?: string;
      selected?: string;
      hover?: string;
      head?: string;
      footer?: string;
    };
    /**
     * If `true`, the table row will shade on hover.
     * @default false
     */
    hover?: boolean;
    /**
     * If `true`, the table row will have the selected shading.
     * @default false
     */
    selected?: boolean;
  };
  defaultComponent: D;
}
/**
 * Will automatically set dynamic row height
 * based on the material table element parent (head, body, etc).
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TableRow API](https://material-ui.com/api/table-row/)
 */
declare const TableRow: OverridableComponent<TableRowTypeMap>;

export type TableRowClassKey = keyof NonNullable<TableRowTypeMap['props']['classes']>;

export type TableRowProps<
  D extends React.ElementType = TableRowTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableRowTypeMap<P, D>, D>;

export default TableRow;
