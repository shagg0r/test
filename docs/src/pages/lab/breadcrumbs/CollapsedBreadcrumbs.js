/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Breadcrumb from '@material-ui/lab/Breadcrumb';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  paper: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
});

function handleClick(event) {
  event.preventDefault();
  alert('You clicked a breadcrumb.'); // eslint-disable-line no-alert
}

function CollapsedBreadcrumbs(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <Breadcrumbs maxItems={2} arial-label="Breadcrumb">
        <Breadcrumb>
          <Link color="inherit" href="#" onClick={handleClick}>
            Home
          </Link>
        </Breadcrumb>
        <Breadcrumb>
          <Link color="inherit" href="#" onClick={handleClick}>
            Catalog
          </Link>
        </Breadcrumb>
        <Breadcrumb>
          <Link color="inherit" href="#" onClick={handleClick}>
            Accessories
          </Link>
        </Breadcrumb>
        <Breadcrumb>
          <Link color="inherit" href="#" onClick={handleClick}>
            New Collection
          </Link>
        </Breadcrumb>
        <Breadcrumb color="textPrimary">Belts</Breadcrumb>
      </Breadcrumbs>
    </Paper>
  );
}

CollapsedBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CollapsedBreadcrumbs);
