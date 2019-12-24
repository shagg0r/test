import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleAlerts() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert variant="filled" color="error">
        This is an error alert—check it out!
      </Alert>
      <Alert variant="filled" color="warning">
        This is a warning alert—check it out!
      </Alert>
      <Alert variant="filled" color="info">
        This is an info alert—check it out!
      </Alert>
      <Alert variant="filled" color="success">
        This is a success alert—check it out!
      </Alert>
    </div>
  );
}
