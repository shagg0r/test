import * as React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

export default {
  react: React,
  '@material-ui/core/styles': { withStyles, makeStyles },
  '@material-ui/core/Button': Button,
  '@material-ui/core/Tooltip': Tooltip,
  '@material-ui/core/Typography': Typography,
};
