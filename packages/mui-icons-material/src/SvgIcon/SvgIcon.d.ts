import * as React from 'react';
import { SxProps, Theme } from '@mui/system';
import { OverridableStringUnion, OverridableComponent, OverrideProps } from '@mui/types';
import { SvgIconClasses } from './svgIconClasses';

export interface SvgIconPropsFontSizeOverrides {}

export interface SvgIconPropsColorOverrides {}

export interface SvgIconTypeMap<P = {}, D extends React.ElementType = 'svg'> {
  props: P & {
    /**
     * Node passed into the SVG element.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<SvgIconClasses>;
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
     * @default 'inherit'
     */
    color?: OverridableStringUnion<
      | 'inherit'
      | 'action'
      | 'disabled'
      | 'primary'
      | 'secondary'
      | 'error'
      | 'info'
      | 'success'
      | 'warning',
      SvgIconPropsColorOverrides
    >;
    /**
     * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
     * @default 'medium'
     */
    fontSize?: OverridableStringUnion<
      'inherit' | 'large' | 'medium' | 'small',
      SvgIconPropsFontSizeOverrides
    >;
    /**
     * Applies a color attribute to the SVG element.
     */
    htmlColor?: string;
    /**
     * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
     * prop will be ignored.
     * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
     * `component`'s viewBox to the root node.
     * @default false
     */
    inheritViewBox?: boolean;
    /**
     * The shape-rendering attribute. The behavior of the different options is described on the
     * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
     * If you are having issues with blurry icons you should investigate this prop.
     */
    shapeRendering?: string;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * Provides a human-readable title for the element that contains it.
     * https://www.w3.org/TR/SVG-access/#Equivalent
     */
    titleAccess?: string;
    /**
     * Allows you to redefine what the coordinates without units mean inside an SVG element.
     * For example, if the SVG element is 500 (width) by 200 (height),
     * and you pass viewBox="0 0 50 20",
     * this means that the coordinates inside the SVG will go from the top left corner (0,0)
     * to bottom right (50,20) and each unit will be worth 10px.
     * @default '0 0 24 24'
     */
    viewBox?: string;
  };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Icons](https://mui.com/material-ui/icons/)
 * - [Material Icons](https://mui.com/material-ui/material-icons/)
 *
 * API:
 *
 * - [SvgIcon API](https://mui.com/material-ui/api/svg-icon/)
 */
declare const SvgIcon: OverridableComponent<SvgIconTypeMap> & { muiName: string };

export type SvgIconProps<
  D extends React.ElementType = SvgIconTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<SvgIconTypeMap<P, D>, D>;

export default SvgIcon;
