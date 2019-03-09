import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import EventListener from 'react-event-listener';
import debounce from 'debounce'; // < 1kb payload overhead when lodash/debounce is > 3kb.
import withStyles from '../styles/withStyles';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    boxSizing: 'border-box',
    flexShrink: 0,
  },
  /* Styles applied to the `div` element that wraps the children. */
  tile: {
    position: 'relative',
    display: 'block', // In case it's not rendered with a div.
    height: '100%',
    overflow: 'hidden',
  },
  /* Styles applied to an `img` element child, if needed to ensure it covers the tile. */
  imgFullHeight: {
    height: '100%',
    transform: 'translateX(-50%)',
    position: 'relative',
    left: '50%',
  },
  /* Styles applied to an `img` element child, if needed to ensure it covers the tile. */
  imgFullWidth: {
    width: '100%',
    position: 'relative',
    transform: 'translateY(-50%)',
    top: '50%',
  },
};

const fit = (imgEl, classes) => {
  if (!imgEl || !imgEl.complete) {
    return;
  }

  if (imgEl.width / imgEl.height > imgEl.parentNode.offsetWidth / imgEl.parentNode.offsetHeight) {
    imgEl.classList.remove(...classes.imgFullWidth.split(' '));
    imgEl.classList.add(...classes.imgFullHeight.split(' '));
  } else {
    imgEl.classList.remove(...classes.imgFullHeight.split(' '));
    imgEl.classList.add(...classes.imgFullWidth.split(' '));
  }

  imgEl.removeEventListener('load', fit);
};

function ensureImageCover(imgElement, classes) {
  if (!imgElement.current) {
    return;
  }

  if (imgElement.current.complete) {
    fit(imgElement.current, classes);
  } else {
    imgElement.current.addEventListener('load', fit);
  }
}

const GridListTile = React.forwardRef(function GridListTile(props, ref) {
  const { children, classes, className, cols, component: Component, rows, ...other } = props;

  const imgElement = React.useRef(null);
  const handleResize = React.useRef(() => {});

  React.useEffect(() => {
    ensureImageCover(imgElement.current, classes);
    if (typeof window !== 'undefined') {
      handleResize.current = debounce(() => {
        fit(imgElement.current, classes);
      }, 166); // Corresponds to 10 frames at 60 Hz.
    }
    return () => {
      handleResize.current.clear();
    };
  });

  return (
    <Component className={clsx(classes.root, className)} ref={ref} {...other}>
      <EventListener target="window" onResize={handleResize.current} />
      <div className={classes.tile}>
        {React.Children.map(children, child => {
          if (!React.isValidElement(child)) {
            return null;
          }

          if (child.type === 'img') {
            return React.cloneElement(child, {
              ref: imgElement,
            });
          }

          return child;
        })}
      </div>
    </Component>
  );
});

GridListTile.propTypes = {
  /**
   * Theoretically you can pass any node as children, but the main use case is to pass an img,
   * in which case GridListTile takes care of making the image "cover" available space
   * (similar to `background-size: cover` or to `object-fit: cover`).
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Width of the tile in number of grid cells.
   */
  cols: PropTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Height of the tile in number of grid cells.
   */
  rows: PropTypes.number,
};

GridListTile.defaultProps = {
  cols: 1,
  component: 'li',
  rows: 1,
};

export default withStyles(styles, { name: 'MuiGridListTile' })(GridListTile);
