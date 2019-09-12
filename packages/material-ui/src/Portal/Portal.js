import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { exactProp } from '@material-ui/utils';
import { setRef, useForkRef } from '../utils/reactHelpers';

function getContainer(container) {
  container = typeof container === 'function' ? container() : container;
  // #StrictMode ready
  return ReactDOM.findDOMNode(container);
}

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */
const Portal = React.forwardRef(function Portal(props, ref) {
  const { children, container, disablePortal = false, onRendered } = props;
  const [mountNode, setMountNode] = React.useState(null);
  const handleRef = useForkRef(children.ref, ref);

  useEnhancedEffect(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [container, disablePortal]);

  useEnhancedEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(ref, mountNode);
      return () => {
        setRef(ref, null);
      };
    }

    return undefined;
  }, [ref, mountNode, disablePortal]);

  useEnhancedEffect(() => {
    if (onRendered && (mountNode || disablePortal)) {
      onRendered();
    }
  }, [onRendered, mountNode, disablePortal]);

  if (disablePortal) {
    React.Children.only(children);
    return React.cloneElement(children, {
      ref: handleRef,
    });
  }

  return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
});

Portal.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The children to render into the `container`.
   */
  children: PropTypes.node,
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(React.Component),
    PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
  ]),
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * Callback fired once the children has been mounted into the `container`.
   *
   * This prop will be deprecated and removed in v5, the ref can be used instead.
   */
  onRendered: PropTypes.func,
};

if (__DEV__) {
  // eslint-disable-next-line
  Portal['propTypes' + ''] = exactProp(Portal.propTypes);
}

export default Portal;
