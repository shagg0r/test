import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export const styles = theme => ({
  /* Styles applied to the root (`Tooltip`) component. */
  root: {
    position: 'relative',
  },
  /* Styles applied to the `Tooltip` label wrapper element */
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.primary,
    padding: '5px 16px',
  },
  /* Styles applied to the `Button` component. */
  actionButton: {
    margin: 8,
    color: theme.palette.text.secondary,
    backgroundColor: emphasize(theme.palette.background.default, 0.12),
    '&:hover': {
      backgroundColor: emphasize(theme.palette.background.default, 0.15),
    },
  },
  /* Styles applied to the `Button` or `Paper` component if `open={true}`. */
  button: {
    transition: `${theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
    })}, opacity 0.8s`,
    opacity: 1,
  },
  /* Styles applied to the `Button` or `Paper` component if `open={false}`. */
  buttonClosed: {
    opacity: 0,
    transform: 'scale(0)',
  },
  /* Styles applied to the `Paper` component if `tooltipOpen={true}` */
  textLabel: {
    position: 'absolute',
    right: 65,
    top: 14,
    padding: '5px 16px',
  },
  textLabelText: {},
  /* Styles applied to the root (`span`) component if `tooltipOpen={true}`. */
  tooltipOpenContainer: {
    position: 'relative',
  },
});

class SpeedDialAction extends React.Component {
  state = {
    tooltipOpen: false,
  };

  handleTooltipClose = () => {
    this.setState({ tooltipOpen: false });
  };

  handleTooltipOpen = () => {
    this.setState({ tooltipOpen: true });
  };

  render() {
    const {
      ButtonProps,
      classes,
      className: classNameProp,
      delay,
      icon,
      id,
      onClick,
      open,
      tooltipTitle,
      tooltipPlacement,
      tooltipOpen,
      ...other
    } = this.props;

    const clickProps = { onClick };
    if (typeof document !== 'undefined' && 'ontouchstart' in document.documentElement) {
      let startTime;
      clickProps.onTouchStart = () => {
        startTime = new Date();
      };
      clickProps.onTouchEnd = event => {
        // only perform action if the touch is a tap, i.e. not long press
        if (new Date() - startTime < 500) {
          onClick();
        }
        event.preventDefault();
        event.stopPropagation();
      };
    }

    clickProps.style = { transitionDelay: `${delay}ms` };

    if (ButtonProps.style) {
      ButtonProps.style.transitionDelay = `${delay}ms`;
    }

    const actionButton = (
      <Button
        variant="fab"
        mini
        className={classNames(classes.actionButton, classes.button, !open && classes.buttonClosed)}
        tabIndex={-1}
        role="menuitem"
        {...clickProps}
        {...ButtonProps}
      >
        {icon}
      </Button>
    );

    if (tooltipOpen) {
      return (
        <span className={classes.tooltipOpenContainer}>
          <Paper
            className={classNames(classes.textLabel, classes.button, !open && classes.buttonClosed)}
            {...clickProps}
          >
            <Typography className={classes.textLabelText}>{tooltipTitle}</Typography>
          </Paper>
          {actionButton}
        </span>
      );
    }

    return (
      <Tooltip
        id={id}
        className={classNames(classes.root, classNameProp)}
        title={tooltipTitle}
        placement={tooltipPlacement}
        onClose={this.handleTooltipClose}
        onOpen={this.handleTooltipOpen}
        open={open && this.state.tooltipOpen}
        classes={{ tooltip: classes.tooltip }}
        {...other}
      >
        {actionButton}
      </Tooltip>
    );
  }
}

SpeedDialAction.propTypes = {
  /**
   * Properties applied to the [`Button`](/api/button) component.
   */
  ButtonProps: PropTypes.object,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   */
  delay: PropTypes.number,
  /**
   * The Icon to display in the SpeedDial Floating Action Button.
   */
  icon: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  open: PropTypes.bool,
  /**
   * Make the tooltip always visible when the SpeedDial is open.
   */
  tooltipOpen: PropTypes.bool,
  /**
   * Placement of the tooltip.
   */
  tooltipPlacement: PropTypes.oneOf([
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  /**
   * Label to display in the tooltip.
   */
  tooltipTitle: PropTypes.node,
};

SpeedDialAction.defaultProps = {
  delay: 0,
  open: false,
  tooltipPlacement: 'left',
};

export default withStyles(styles, { name: 'MuiSpeedDialAction' })(SpeedDialAction);
