import { PropTypes, InternalStandardProps as StandardProps } from '..';
import { PaperProps } from '../Paper';

export interface AppBarProps extends StandardProps<PaperProps> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    positionFixed?: string;
    positionAbsolute?: string;
    positionSticky?: string;
    positionStatic?: string;
    positionRelative?: string;
    colorDefault?: string;
    colorPrimary?: string;
    colorSecondary?: string;
    colorInherit?: string;
    colorTransparent?: string;
  };
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color?: PropTypes.Color | 'transparent';
  /**
   * The positioning type. The behavior of the different options is described
   * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).
   * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
   * @default 'fixed'
   */
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
}

export type AppBarClassKey = keyof NonNullable<AppBarProps['classes']>;

/**
 *
 * Demos:
 *
 * - [App Bar](https://material-ui.com/components/app-bar/)
 *
 * API:
 *
 * - [AppBar API](https://material-ui.com/api/app-bar/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
export default function AppBar(props: AppBarProps): JSX.Element;
