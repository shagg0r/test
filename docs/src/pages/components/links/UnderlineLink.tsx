/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }),
);

export default function Links() {
  const classes = useStyles();
  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

  return (
    <Typography className={classes.root}>
      <Link href="#" onClick={preventDefault} underline="none">
      {'underline="none"'}
      </Link>
      <Link href="#" onClick={preventDefault} underline="hover">
        {'underline="hover"'}
      </Link>
      <Link href="#" onClick={preventDefault} underline="always">
        {'underline="always"'}
      </Link>
    </Typography>
  );
}
