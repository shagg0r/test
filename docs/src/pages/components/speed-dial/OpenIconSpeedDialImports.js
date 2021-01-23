import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/core/SpeedDial';
import SpeedDialIcon from '@material-ui/core/SpeedDialIcon';
import SpeedDialAction from '@material-ui/core/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/SpeedDial': SpeedDial,
  '@material-ui/core/SpeedDialIcon': SpeedDialIcon,
  '@material-ui/core/SpeedDialAction': SpeedDialAction,
  '@material-ui/icons/FileCopyOutlined': FileCopyIcon,
  '@material-ui/icons/Save': SaveIcon,
  '@material-ui/icons/Print': PrintIcon,
  '@material-ui/icons/Share': ShareIcon,
  '@material-ui/icons/Edit': EditIcon,
};
