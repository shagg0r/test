import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/lab/TreeView': TreeView,
  '@material-ui/icons/ExpandMore': ExpandMoreIcon,
  '@material-ui/icons/ChevronRight': ChevronRightIcon,
  '@material-ui/lab/TreeItem': TreeItem,
};
