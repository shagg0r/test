import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { useSlotProps } from '@mui/base/utils';
import { useMenu, MenuUnstyledContext, MenuUnstyledContextType } from '@mui/base/MenuUnstyled';
import { styled, useThemeProps } from '../styles';
import List from '../List';
import { MenuListProps, MenuListTypeMap } from './MenuListProps';
import { getMenuListUtilityClass } from './menuListClasses';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMenuListUtilityClass, {});
};

const MenuListRoot = styled(List, {
  name: 'MuiMenuList',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: MenuListProps; component?: React.ElementType }>({});

const MenuList = React.forwardRef(function MenuList(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiMenuList',
  });

  const { actions, id: idProp, children, className, size = 'md', ...other } = props;

  const {
    registerItem,
    unregisterItem,
    getListboxProps,
    getItemProps,
    getItemState,
    highlightFirstItem,
    highlightLastItem,
  } = useMenu({
    listboxRef: ref,
    listboxId: idProp,
  });

  React.useImperativeHandle(
    actions,
    () => ({
      highlightFirstItem,
      highlightLastItem,
    }),
    [highlightFirstItem, highlightLastItem],
  );

  const classes = useUtilityClasses();
  const ownerState = {
    ...props,
    size,
  };
  const listboxProps = useSlotProps({
    elementType: MenuListRoot,
    getSlotProps: getListboxProps,
    externalSlotProps: {},
    externalForwardedProps: other,
    additionalProps: {
      size,
    },
    ownerState,
    className: classes.root,
  });

  const contextValue = {
    registerItem,
    unregisterItem,
    getItemState,
    getItemProps,
    open: true,
  } as MenuUnstyledContextType;

  return (
    <MenuListRoot {...listboxProps}>
      <MenuUnstyledContext.Provider value={contextValue}>{children}</MenuUnstyledContext.Provider>
    </MenuListRoot>
  );
}) as OverridableComponent<MenuListTypeMap>;

MenuList.propTypes /* remove-proptypes */ = {
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
   * The size of the component (affect other nested list* components).
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
} as any;

export default MenuList;
