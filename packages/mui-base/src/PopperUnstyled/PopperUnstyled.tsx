import * as React from 'react';
import { OverridableComponent } from '@mui/types';
import {
  chainPropTypes,
  HTMLElementType,
  refType,
  unstable_ownerDocument as ownerDocument,
  unstable_useEnhancedEffect as useEnhancedEffect,
  unstable_useForkRef as useForkRef,
} from '@mui/utils';
import {
  autoUpdate,
  computePosition,
  flip,
  Middleware,
  Placement,
  ReferenceElement,
  shift,
  VirtualElement,
} from '@floating-ui/dom';
import PropTypes from 'prop-types';
import composeClasses from '../composeClasses';
import Portal from '../Portal';
import { getPopperUnstyledUtilityClass } from './popperUnstyledClasses';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import {
  PopperPlacementType,
  PopperTooltipProps,
  PopperTooltipTypeMap,
  PopperUnstyledChildrenProps,
  PopperUnstyledProps,
  PopperUnstyledRootSlotProps,
  PopperUnstyledTransitionProps,
  PopperUnstyledTypeMap,
} from './PopperUnstyled.types';

function flipPlacement(placement?: PopperPlacementType, direction?: 'ltr' | 'rtl') {
  if (direction === 'ltr') {
    return placement;
  }

  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';
    case 'bottom-start':
      return 'bottom-end';
    case 'top-end':
      return 'top-start';
    case 'top-start':
      return 'top-end';
    default:
      return placement;
  }
}

function resolveAnchorEl(
  anchorEl:
    | VirtualElement
    | (() => VirtualElement)
    | HTMLElement
    | (() => HTMLElement)
    | null
    | undefined,
): HTMLElement | VirtualElement | null | undefined {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

function isHTMLElement(element: HTMLElement | VirtualElement): element is HTMLElement {
  return (element as HTMLElement).nodeType !== undefined;
}

function isVirtualElement(element: HTMLElement | VirtualElement): element is VirtualElement {
  return !isHTMLElement(element);
}

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getPopperUnstyledUtilityClass, {});
};

const defaultPopperOptions = {};

const PopperTooltip = React.forwardRef(function PopperTooltip(
  props: PopperTooltipProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const {
    anchorEl,
    children,
    component,
    direction,
    disablePortal,
    middleware,
    open,
    ownerState,
    placement: initialPlacement,
    popperOptions,
    popperRef: popperRefProp,
    slotProps = {},
    slots = {},
    TransitionProps,
    ...other
  } = props;

  const tooltipRef = React.useRef<HTMLElement | null>(null);
  const ownRef = useForkRef(tooltipRef, ref);

  const popperRef = React.useRef<ReferenceElement | null>(null);

  React.useImperativeHandle(popperRefProp, () => popperRef.current!, []);

  const rtlPlacement = flipPlacement(initialPlacement, direction);
  /**
   * placement initialized from prop but can change during lifetime if modifiers.flip.
   * modifiers.flip is essentially a flip for controlled/uncontrolled behavior
   */
  const [placement, setPlacement] = React.useState<Placement | undefined>(rtlPlacement);
  const [resolvedAnchorElement, setResolvedAnchorElement] = React.useState<
    HTMLElement | VirtualElement | null | undefined
  >(resolveAnchorEl(anchorEl));

  React.useEffect(() => {
    if (anchorEl) {
      setResolvedAnchorElement(resolveAnchorEl(anchorEl));
    }
  }, [anchorEl]);

  useEnhancedEffect(() => {
    if (!resolvedAnchorElement || !open) {
      return undefined;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (
        resolvedAnchorElement &&
        isHTMLElement(resolvedAnchorElement) &&
        resolvedAnchorElement.nodeType === 1
      ) {
        const box = resolvedAnchorElement.getBoundingClientRect();

        if (
          process.env.NODE_ENV !== 'test' &&
          box.top === 0 &&
          box.left === 0 &&
          box.right === 0 &&
          box.bottom === 0
        ) {
          console.warn(
            [
              'MUI: The `anchorEl` prop provided to the component is invalid.',
              'The anchor element should be part of the document layout.',
              "Make sure the element is present in the document or that it's not display none.",
            ].join('\n'),
          );
        }
      }
    }

    let popperMiddleware: Middleware[] = [
      shift({ altBoundary: disablePortal }),
      flip({ altBoundary: disablePortal }),
    ];

    if (middleware != null) {
      popperMiddleware = popperMiddleware.concat(middleware);
    }
    // setPlacement(data.placement);
    const popperUnsubscribe = autoUpdate(resolvedAnchorElement, tooltipRef.current!, async () => {
      const state = await computePosition(resolvedAnchorElement, tooltipRef.current!, {
        placement: rtlPlacement,
        ...popperOptions,
        middleware: popperMiddleware,
      });
      setPlacement(state.placement);
    });

    return () => {
      popperUnsubscribe();
    };
  }, [resolvedAnchorElement, disablePortal, middleware, open, popperOptions, rtlPlacement]);

  const childProps: PopperUnstyledChildrenProps = { placement: placement! };

  if (TransitionProps !== null) {
    childProps.TransitionProps = TransitionProps;
  }

  const classes = useUtilityClasses();
  const Root = component ?? slots.root ?? 'div';
  const rootProps: WithOptionalOwnerState<PopperUnstyledRootSlotProps> = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      role: 'tooltip',
      ref: ownRef,
    },
    ownerState: {
      // shallow merge ownerState from external component, e.g. Joy Menu.
      ...props,
      ...ownerState,
    },
    className: classes.root,
  });

  return (
    <Root {...rootProps}>{typeof children === 'function' ? children(childProps) : children}</Root>
  );
}) as OverridableComponent<PopperTooltipTypeMap>;

/**
 * Poppers rely on the 3rd party library [Popper.js](https://popper.js.org/docs/v2/) for positioning.
 *
 * Demos:
 *
 * - [Unstyled Popper](https://mui.com/base/react-popper/)
 *
 * API:
 *
 * - [PopperUnstyled API](https://mui.com/base/api/popper-unstyled/)
 */
const PopperUnstyled = React.forwardRef(function PopperUnstyled(
  props: PopperUnstyledProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    anchorEl,
    children,
    container: containerProp,
    direction = 'ltr',
    disablePortal = false,
    keepMounted = false,
    middleware,
    open,
    placement = 'bottom',
    popperOptions = defaultPopperOptions,
    popperRef,
    style,
    transition = false,
    slotProps = {},
    slots = {},
    ...other
  } = props;

  const [exited, setExited] = React.useState(true);

  const handleEnter = () => {
    setExited(false);
  };

  const handleExited = () => {
    setExited(true);
  };

  if (!keepMounted && !open && (!transition || exited)) {
    return null;
  }

  // If the container prop is provided, use that
  // If the anchorEl prop is provided, use its parent body element as the container
  // If neither are provided let the Modal take care of choosing the container
  let container;
  if (containerProp) {
    container = containerProp;
  } else if (anchorEl) {
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);
    container =
      resolvedAnchorEl && isHTMLElement(resolvedAnchorEl)
        ? ownerDocument(resolvedAnchorEl).body
        : ownerDocument(null).body;
  }
  const display = !open && keepMounted && (!transition || exited) ? 'none' : undefined;
  const transitionProps: PopperUnstyledTransitionProps | undefined = transition
    ? {
        in: open,
        onEnter: handleEnter,
        onExited: handleExited,
      }
    : undefined;

  return (
    <Portal disablePortal={disablePortal} container={container}>
      <PopperTooltip
        anchorEl={anchorEl}
        direction={direction}
        disablePortal={disablePortal}
        middleware={middleware}
        ref={ref}
        open={transition ? !exited : open}
        placement={placement}
        popperOptions={popperOptions}
        popperRef={popperRef}
        slotProps={slotProps}
        slots={slots}
        {...other}
        style={{
          // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
          position: 'fixed',
          // Fix Popper.js display issue
          top: 0,
          left: 0,
          display,
          ...style,
        }}
        TransitionProps={transitionProps}
      >
        {children}
      </PopperTooltip>
    </Portal>
  );
}) as OverridableComponent<PopperUnstyledTypeMap>;

PopperUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: chainPropTypes(
    PropTypes.oneOfType([HTMLElementType, PropTypes.object, PropTypes.func]),
    (props) => {
      if (props.open) {
        const resolvedAnchorEl = resolveAnchorEl(props.anchorEl);

        if (
          resolvedAnchorEl &&
          isHTMLElement(resolvedAnchorEl) &&
          resolvedAnchorEl.nodeType === 1
        ) {
          const box = resolvedAnchorEl.getBoundingClientRect();

          if (
            process.env.NODE_ENV !== 'test' &&
            box.top === 0 &&
            box.left === 0 &&
            box.right === 0 &&
            box.bottom === 0
          ) {
            return new Error(
              [
                'MUI: The `anchorEl` prop provided to the component is invalid.',
                'The anchor element should be part of the document layout.',
                "Make sure the element is present in the document or that it's not display none.",
              ].join('\n'),
            );
          }
        } else if (
          !resolvedAnchorEl ||
          typeof resolvedAnchorEl.getBoundingClientRect !== 'function' ||
          (isVirtualElement(resolvedAnchorEl) &&
            resolvedAnchorEl.contextElement != null &&
            resolvedAnchorEl.contextElement.nodeType !== 1)
        ) {
          return new Error(
            [
              'MUI: The `anchorEl` prop provided to the component is invalid.',
              'It should be an HTML element instance or a virtualElement ',
              '(https://popper.js.org/docs/v2/virtual-elements/).',
            ].join('\n'),
          );
        }
      }

      return null;
    },
  ),
  /**
   * Popper render function or node.
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.func,
  ]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: PropTypes.oneOf(['ltr', 'rtl']),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  middleware: PropTypes.arrayOf(
    PropTypes.shape({
      fn: PropTypes.func.isRequired,
      name: PropTypes.string.isRequired,
      options: PropTypes.any,
    }),
  ),
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: PropTypes.oneOf([
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: PropTypes.shape({
    middleware: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.oneOf([false]),
        PropTypes.shape({
          fn: PropTypes.func.isRequired,
          name: PropTypes.string.isRequired,
          options: PropTypes.any,
        }),
      ]),
    ),
    placement: PropTypes.oneOf([
      'bottom-end',
      'bottom-start',
      'bottom',
      'left-end',
      'left-start',
      'left',
      'right-end',
      'right-start',
      'right',
      'top-end',
      'top-start',
      'top',
    ]),
    platform: PropTypes.shape({
      convertOffsetParentRelativeRectToViewportRelativeRect: PropTypes.func,
      getClientRects: PropTypes.func,
      getClippingRect: PropTypes.func.isRequired,
      getDimensions: PropTypes.func.isRequired,
      getDocumentElement: PropTypes.func,
      getElementRects: PropTypes.func.isRequired,
      getOffsetParent: PropTypes.func,
      getScale: PropTypes.func,
      isElement: PropTypes.func,
      isRTL: PropTypes.func,
    }),
    strategy: PropTypes.oneOf(['absolute', 'fixed']),
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: refType,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: PropTypes.bool,
} as any;

export default PopperUnstyled;
