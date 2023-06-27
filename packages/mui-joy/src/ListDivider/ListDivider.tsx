import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { DividerRoot } from '../Divider/Divider';
import { ListDividerOwnerState, ListDividerTypeMap } from './ListDividerProps';
import { getListDividerUtilityClass } from './listDividerClasses';
import RowListContext from '../List/RowListContext';
import ComponentListContext from '../List/ComponentListContext';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: ListDividerOwnerState) => {
  const { orientation, inset } = ownerState;
  const slots = {
    root: [
      'root',
      orientation,
      // `insetContext` class is already produced by Divider
      inset && inset !== 'context' && `inset${capitalize(inset)}`,
    ],
  };

  return composeClasses(slots, getListDividerUtilityClass, {});
};

const ListDividerRoot = styled(DividerRoot as unknown as 'li', {
  name: 'JoyListDivider',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListDividerOwnerState }>(({ ownerState }) => ({
  '--first-child': 'initial', // workaround because emotion does not support empty string or space as a value.
  '--not-first-child': 'var(--unstable_not-first-child,)',
  '--ListDivider-inset': `var(--inset-${ownerState.inset ?? 'context'})`,
  '--inset-context': 'var(--ListDivider-inset,)',
  '--inset-gutter': 'var(--ListDivider-inset,)',
  '--inset-startDecorator': 'var(--ListDivider-inset,)',
  '--inset-startContent': 'var(--ListDivider-inset,)',
  marginInlineStart:
    'var(--List-horizontal, var(--first-child, var(--ListDivider-gap)) var(--not-first-child, calc(var(--List-gap) + var(--ListDivider-gap))))' +
    ` var(--List-vertical, var(--inset-context, calc(-1 * var(--List-padding))))
      var(--List-vertical, var(--inset-gutter, var(--ListItem-paddingLeft)))
      var(--List-vertical, var(--inset-startDecorator, var(--ListItem-paddingLeft)))
      var(--List-vertical, var(--inset-startContent, calc(var(--ListItem-paddingLeft) + var(--ListItemDecorator-size))))`,
  marginInlineEnd:
    'var(--List-horizontal, var(--ListDivider-gap))' +
    ' var(--List-vertical, var(--inset-context, calc(-1 * var(--List-padding))))' +
    ' var(--List-vertical, var(--inset-gutter, var(--ListItem-paddingRight)))',
  marginBlockStart:
    'var(--List-horizontal, var(--inset-gutter, var(--ListItem-paddingY)))' +
    ' var(--List-vertical, var(--not-first-child, calc(var(--List-gap) + var(--ListDivider-gap))))',
  marginBlockEnd:
    'var(--List-horizontal, var(--inset-gutter, var(--ListItem-paddingY))) var(--List-vertical, var(--ListDivider-gap))',
  '&:not([data-first-child])': {
    '--first-child': 'var(--unstable_first-child,)',
    '--not-first-child': 'initial',
  },
}));
/**
 *
 * Demos:
 *
 * - [Lists](https://mui.com/joy-ui/react-list/)
 *
 * API:
 *
 * - [ListDivider API](https://mui.com/joy-ui/api/list-divider/)
 */
const ListDivider = React.forwardRef(function ListDivider(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyListDivider',
  });

  const row = React.useContext(RowListContext);
  const listComponent = React.useContext(ComponentListContext);

  const {
    component: componentProp,
    role: roleProp,
    className,
    children,
    inset = 'context',
    orientation: orientationProp,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const [listElement] = listComponent?.split(':') || ['', ''];
  const component =
    componentProp || (listElement && !listElement.match(/^(ul|ol|menu)$/) ? 'div' : 'li');
  const role = roleProp || (component === 'li' ? 'separator' : undefined);

  const orientation = orientationProp || (row ? 'vertical' : 'horizontal');
  const ownerState = {
    ...props,
    inset,
    orientation,
    component,
    role,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: ListDividerRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      as: component,
      role,
      ...(role === 'separator' &&
        orientation === 'vertical' && {
          // The implicit aria-orientation of separator is 'horizontal'
          // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role
          'aria-orientation': 'vertical',
        }),
    },
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as OverridableComponent<ListDividerTypeMap>;

ListDivider.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The empty space on the side(s) of the divider in a vertical list.
   *
   * For horizontal list (the nearest parent List has `row` prop set to `true`), only `inset="gutter"` affects the list divider.
   * @default 'context'
   */
  inset: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['context', 'gutter', 'startDecorator', 'startContent']),
    PropTypes.string,
  ]),
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes /* @typescript-to-proptypes-ignore */.oneOf(['horizontal', 'vertical']),
  /**
   * @ignore
   */
  role: PropTypes /* @typescript-to-proptypes-ignore */.string,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default ListDivider;
