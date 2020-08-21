import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface TableContainerTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The table itself, normally `<Table />`.
     */
    children?: React.ReactNode;
    /**
     * See [CSS API](#css) below for more details.
     */
    classes?: {};
  };
  defaultComponent: D;
  classKey: TableContainerClassKey;
}
/**
 *
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TableContainer API](https://material-ui.com/api/table-container/)
 */
declare const TableContainer: OverridableComponent<TableContainerTypeMap>;

export type TableContainerClassKey = 'root';

export type TableContainerProps<
  D extends React.ElementType = TableContainerTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableContainerTypeMap<P, D>, D>;

export default TableContainer;
