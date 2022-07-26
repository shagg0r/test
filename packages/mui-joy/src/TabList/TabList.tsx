import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useTabsList } from '@mui/base/TabsListUnstyled';
import { useSlotProps } from '@mui/base/utils';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { ListRoot } from '../List/List';
import RowListContext from '../List/RowListContext';
import { getTabListUtilityClass } from './tabListClasses';
import { TabListProps, TabListOwnerState, TabListTypeMap } from './TabListProps';

const useUtilityClasses = (ownerState: TabListOwnerState) => {
  const { orientation, size, variant, color } = ownerState;

  const slots = {
    root: [
      'root',
      orientation,
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getTabListUtilityClass, {});
};

const TabListRoot = styled(ListRoot, {
  name: 'JoyTabList',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TabListProps }>(({ theme }) => ({
  '--List-radius': theme.vars.radius.md,
  '--List-gap': '0.5rem',
  '--List-padding': 'var(--List-gap)',
  '--List-divider-gap': '0px',
}));

const TabList = React.forwardRef(function TabList(inProps, ref) {
  const props = useThemeProps<typeof inProps & TabListProps>({
    props: inProps,
    name: 'JoyTabList',
  });

  const {
    className,
    component = 'div',
    children,
    variant = 'soft',
    color = 'neutral',
    size = 'md',
    ...other
  } = props;

  const { isRtl, orientation, getRootProps, processChildren } = useTabsList({ ...props, ref });

  const row = orientation === 'horizontal';

  const ownerState = {
    ...props,
    isRtl,
    orientation,
    variant,
    color,
    size,
    row,
    nesting: false,
    scoped: true,
  };

  const classes = useUtilityClasses(ownerState);

  const tabsListRootProps = useSlotProps({
    elementType: TabListRoot,
    getSlotProps: getRootProps,
    externalSlotProps: {},
    externalForwardedProps: other,
    additionalProps: {
      as: component,
    },
    ownerState,
    className: classes.root,
  });

  const processedChildren = processChildren();

  return (
    <RowListContext.Provider value={row}>
      {/* @ts-ignore conflicted ref types */}
      <TabListRoot {...tabsListRootProps}>
        {React.Children.map(processedChildren, (child, index) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                // to let List(Item|ItemButton) knows when to apply margin(Inline|Block)Start
                ...(index === 0 && { 'data-first-child': '' }),
              })
            : child,
        )}
      </TabListRoot>
    </RowListContext.Provider>
  );
}) as OverridableComponent<TabListTypeMap>;

TabList.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the TabList if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The size of the component.
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant to use.
   * @default 'soft'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default TabList;
