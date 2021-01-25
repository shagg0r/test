import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import Typography from '../Typography';
import ListContext from '../List/ListContext';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled from '../styles/experimentalStyled';
import { getListItemTextUtilityClass } from './listItemTextClasses';

const overridersResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(styles.root || {}, {
    ...(styleProps.inset && styles.inset),
    ...(styleProps.primary && styleProps.secondary && styles.multiline),
    ...(styleProps.dense && styles.dense),
  });
};

const useUtilityClasses = (styleProps) => {
  const { classes, inset, primary, secondary, dense } = styleProps;

  const slots = {
    root: ['root', inset && 'inset', dense && 'dense', primary && secondary && 'multiline'],
    primary: [primary && 'primary'],
    secondary: [secondary && 'secondary'],
  };

  return composeClasses(slots, getListItemTextUtilityClass, classes);
};

const ListItemTextRoot = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiListItemText',
    slot: 'Root',
    overridersResolver,
  },
)(({ styleProps }) => ({
  /* Styles applied to the root element. */
  flex: '1 1 auto',
  minWidth: 0,
  marginTop: 4,
  marginBottom: 4,
  /* Styles applied to the Typography component if primary and secondary are set. */
  ...(styleProps.primary &&
    styleProps.secondary && {
      marginTop: 6,
      marginBottom: 6,
    }),
  /* Styles applied to the root element if `inset={true}`. */
  ...(styleProps.inset && {
    paddingLeft: 56,
  }),
  /* Styles applied to the Typography component if dense. */
  ...(styleProps.dense && {}),
}));

const ListItemTextPrimary = experimentalStyled(
  Typography,
  {},
  {
    name: 'MuiListItemText',
    slot: 'Primary',
  },
)(() => ({
  /* Styles applied to the primary `Typography` component. */
}));

const ListItemTextSecondary = experimentalStyled(
  Typography,
  {},
  {
    name: 'MuiListItemText',
    slot: 'Secondary',
  },
)(() => ({
  /* Styles applied to the secondary `Typography` component. */
}));

const ListItemText = React.forwardRef(function ListItemText(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiListItemText' });
  const {
    children,
    className,
    disableTypography = false,
    inset = false,
    primary: primaryProp,
    primaryTypographyProps,
    secondary: secondaryProp,
    secondaryTypographyProps,
    ...other
  } = props;
  const { dense } = React.useContext(ListContext);

  const styleProps = {
    ...props,
    inset,
    primary: primaryProp,
    secondary: secondaryProp,
    dense,
  };

  const classes = useUtilityClasses(styleProps);

  let primary = primaryProp != null ? primaryProp : children;
  if (primary != null && primary.type !== Typography && !disableTypography) {
    primary = (
      <ListItemTextPrimary
        variant={dense ? 'body2' : 'body1'}
        className={classes.primary}
        component="span"
        display="block"
        styleProps={styleProps}
        {...primaryTypographyProps}
      >
        {primary}
      </ListItemTextPrimary>
    );
  }

  let secondary = secondaryProp;
  if (secondary != null && secondary.type !== Typography && !disableTypography) {
    secondary = (
      <ListItemTextSecondary
        variant="body2"
        className={classes.secondary}
        color="textSecondary"
        display="block"
        styleProps={styleProps}
        {...secondaryTypographyProps}
      >
        {secondary}
      </ListItemTextSecondary>
    );
  }

  return (
    <ListItemTextRoot
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    >
      {primary}
      {secondary}
    </ListItemTextRoot>
  );
});

ListItemText.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Alias for the `primary` prop.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   * @default false
   */
  disableTypography: PropTypes.bool,
  /**
   * If `true`, the children are indented.
   * This should be used if there is no left avatar or left icon.
   * @default false
   */
  inset: PropTypes.bool,
  /**
   * The main content element.
   */
  primary: PropTypes.node,
  /**
   * These props will be forwarded to the primary typography component
   * (as long as disableTypography is not `true`).
   */
  primaryTypographyProps: PropTypes.object,
  /**
   * The secondary content element.
   */
  secondary: PropTypes.node,
  /**
   * These props will be forwarded to the secondary typography component
   * (as long as disableTypography is not `true`).
   */
  secondaryTypographyProps: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default ListItemText;
