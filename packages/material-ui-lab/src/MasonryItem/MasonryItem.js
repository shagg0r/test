import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  createUnarySpacing,
  getValue,
  handleBreakpoints,
  unstable_resolveBreakpointValues as resolveBreakpointValues,
} from '@material-ui/system';
import { unstable_useForkRef as useForkRef } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { styled, useThemeProps } from '@material-ui/core/styles';
import { getMasonryItemUtilityClass } from './masonryItemClasses';
import MasonryContext from '../Masonry/MasonryContext';

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMasonryItemUtilityClass, classes);
};

export const style = ({ styleProps, theme }) => {
  let styles = {
    width: '100%',
    '& > *': {
      // all contents should have a width of 100%
      width: '100%',
      boxSizing: 'inherit',
      ...(styleProps.isSSR && { height: '100%' }),
      ...(styleProps.isImage && !styleProps.isSSR && { height: styleProps.height }),
    },
    visibility: styleProps.height ? 'visible' : 'hidden',
    gridColumnEnd: `span ${styleProps.columnSpan}`,
    boxSizing: 'inherit',
  };

  const base = {};
  Object.keys(theme.breakpoints.values).forEach((breakpoint) => {
    if (styleProps.spacing[breakpoint] != null) {
      base[breakpoint] = true;
    }
  });
  const spacingValues = resolveBreakpointValues({ values: styleProps.spacing, base });
  const transformer = createUnarySpacing(theme);
  const styleFromPropValue = (propValue) => {
    const gap = styleProps.height ? Number(getValue(transformer, propValue).replace('px', '')) : 0;
    const rowSpan = styleProps.height ? Math.ceil(styleProps.height + gap) : 0;
    return {
      gridRowEnd: `span ${rowSpan}`,
      paddingBottom: gap - 1,
    };
  };
  styles = { ...styles, ...handleBreakpoints({ theme }, spacingValues, styleFromPropValue) };

  return styles;
};

const MasonryItemRoot = styled('div', {
  name: 'MuiMasonryItem',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [styles.root];
  },
})(style);

const MasonryItem = React.forwardRef(function MasonryItem(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiMasonryItem',
  });

  const masonryItemRef = React.useRef(null);

  const { spacing = 1 } = React.useContext(MasonryContext);
  const isImage = (element) => {
    return element.type === 'img';
  };
  const {
    children,
    className,
    component = 'div',
    columnSpan = 1,
    height = isImage(children) ? 1 : undefined,
    // images should have defined dimensions for browser to correctly lay out and paint.
    // browser can't handle a large number of images without pre-defined dimensions
    ...other
  } = props;
  const isSSR = !((isImage(children) && height === 1) || height === undefined);
  const [styleProps, setStyleProps] = React.useState({
    ...props,
    isSSR,
    isImage: isImage(children),
    spacing,
    columnSpan,
    height: height < 0 ? 0 : height, // MasonryItems to which negative or zero height is passed will be hidden
  });

  const classes = useUtilityClasses(styleProps);
  const resizeObserver = React.useRef(null);

  React.useEffect(() => {
    if (isImage(children) && styleProps.height === 1) {
      const img = new Image();
      img.src =
        children.props.srcSet ||
        children.props.src ||
        children.props['data-src'] ||
        children.props['data-srcSet'];
      img.onload = () => {
        setStyleProps({
          ...styleProps,
          height: img.height,
        });
      };
    }
  }, [children, styleProps]);

  React.useEffect(() => {
    // do not create a resize observer in case of SSR masonry
    if (isSSR) {
      return true;
    }
    // do not create a resize observer until height is set by onload() callback above
    if (isImage(children) && styleProps.height === 1) {
      return true;
    }
    const handleImageLoadError = () => {
      const src = masonryItemRef.current.firstChild.src;
      masonryItemRef.current.firstChild.src = `${src}?${new Date().getTime()}`;
    };
    resizeObserver.current = new ResizeObserver(([item]) => {
      if (styleProps.height !== item.contentRect.height) {
        setStyleProps({
          ...styleProps,
          height: item.contentRect.height,
        });
      }
    });
    const item = masonryItemRef.current.firstChild;
    const observer = resizeObserver.current;
    item.addEventListener('error', handleImageLoadError);
    observer.observe(item);
    return () => {
      observer.unobserve(item);
      item.removeEventListener('error', handleImageLoadError);
    };
  }, [children, isSSR, styleProps]);

  React.useEffect(() => {
    // handle responsiveness to `height` prop in case of SSR masonry
    if (isSSR && height !== styleProps.height) {
      setStyleProps({
        ...styleProps,
        height: height < 0 ? 0 : height,
      });
    }
    // re-style if `spacing` updates
    if (spacing !== styleProps.spacing) {
      setStyleProps({ ...styleProps, spacing });
    }
    // re-style if `columnSpan` updates
    if (columnSpan !== styleProps.columnSpan) {
      setStyleProps({ ...styleProps, columnSpan });
    }
  }, [isSSR, height, spacing, columnSpan, styleProps]);

  const handleRef = useForkRef(ref, masonryItemRef);
  return (
    <MasonryItemRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={handleRef}
      styleProps={styleProps}
      {...other}
    >
      {React.Children.only(children)}
    </MasonryItemRoot>
  );
});

MasonryItem.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally an `<img />` or a `<div />`. It should be only one element.
   */
  children: PropTypes.element.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The number of columns taken up by the component
   * @default 1
   */
  columnSpan: PropTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The height of the component in px. This is provided for server-side rendering.
   */
  height: PropTypes.number,
  /**
   * Allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default MasonryItem;
