import * as React from 'react';
import { withStyles } from 'tss-react/mui';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

function getStyles({ palette, spacing }) {
  return {
    root: {
      color: palette.primary.main,
    },
    actions: {
      padding: spacing(1),
    },
    button: {},
  };
}

export const MyCard = withStyles(
  (props) => {
    const { classes } = props;
    return (
      <Card className={classes.root}>
        <CardActions className={classes.actions}>
          <Button className={classes.button}>Submit</Button>
        </CardActions>
      </Card>
    );
  },
  getStyles,
  { name: 'ACard' }
);

