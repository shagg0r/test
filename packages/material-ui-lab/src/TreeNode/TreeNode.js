import React from 'react';
import PropTypes from 'prop-types';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/styles';
import useTreeState from '../TreeView/useTreeState';

const useStyles = makeStyles({
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  nestedList: {
    margin: 0,
    padding: 0,
    marginLeft: 26,
  },
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  iconRoot: {
    marginRight: 2,
    width: 24,
    minWidth: 24,
    display: 'flex',
    justifyContent: 'center',
  },
});

const TreeNode = React.forwardRef(function TreeNode(props, ref) {
  const { children, collapseIcon, expandIcon, icon, id, label, ...other } = props;
  const classes = useStyles(props);
  const { isExpanded, toggle, icons } = useTreeState();

  const expanded = isExpanded(id);

  const handleClick = event => {
    if (ref && event.target !== ref.current && event.target !== ref.current.firstElementChild) {
      return;
    }

    toggle(id);
    event.stopPropagation();
  };

  let stateIcon = null;

  if (icons.expandIcon && children && !expanded) {
    stateIcon = icons.expandIcon;
  }
  if (icons.collapseIcon && children && expanded) {
    stateIcon = icons.collapseIcon;
  }

  if (expandIcon && children && !expanded) {
    stateIcon = expandIcon;
  }

  if (collapseIcon && children && expanded) {
    stateIcon = collapseIcon;
  }

  const stateIconsProvided = icons && (icons.collapseIcon || icons.expandIcon);

  let startAdornment = null;

  if (children) {
    if (icons.defaultNodeIcon || icon) {
      startAdornment = (
        <ListItemIcon className={classes.iconRoot}>{icon || icons.defaultNodeIcon}</ListItemIcon>
      );
    }
  } else if (icons.defaultLeafIcon || icon) {
    startAdornment = (
      <ListItemIcon className={classes.iconRoot}>{icon || icons.defaultLeafIcon}</ListItemIcon>
    );
  }

  return (
    <li className={classes.root} role="treeitem" onClick={handleClick} ref={ref} {...other}>
      <div className={classes.content}>
        {stateIconsProvided ? <div className={classes.iconRoot}>{stateIcon}</div> : null}
        {startAdornment}
        <Typography className={classes.title}>{label}</Typography>
      </div>
      {children && (
        <Collapse className={classes.nestedList} in={expanded} component="ul">
          {children}
        </Collapse>
      )}
    </li>
  );
});

TreeNode.propTypes = {
  children: PropTypes.node,
  collapseIcon: PropTypes.node,
  expandIcon: PropTypes.node,
  icon: PropTypes.node,
  id: PropTypes.string.isRequired,
  label: PropTypes.node,
};

export default TreeNode;
