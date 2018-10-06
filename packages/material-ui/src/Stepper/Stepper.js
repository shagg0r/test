// @inheritedComponent Paper

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Paper from '../Paper';
import StepConnector from '../StepConnector';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    padding: 24,
  },
  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    flexDirection: 'column',
  },
  /* Styles applied to the root element if `alternativeLabel={true}`. */
  alternativeLabel: {
    alignItems: 'flex-start',
  },
};

function Stepper(props) {
  const {
    activeStep,
    alternativeLabel,
    children,
    classes,
    className: classNameProp,
    connector: connectorProp,
    nonLinear,
    orientation,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    classes[orientation],
    {
      [classes.alternativeLabel]: alternativeLabel,
    },
    classNameProp,
  );

  const connector = React.isValidElement(connectorProp)
    ? React.cloneElement(connectorProp, { orientation })
    : null;
  const childrenArray = React.Children.toArray(children);
  const steps = childrenArray.map((step, index) => {
    const controlProps = {
      index,
      orientation,
      last: index + 1 === childrenArray.length,
      alternativeLabel,
      connector: connectorProp,
    };

    function getStepState(active, idx) {
      if (active === idx) return { active: true };
      if (!nonLinear && active > idx) return { completed: true };
      if (!nonLinear && active < idx) return { disabled: true };
      return {};
    }

    const state = {
      active: false,
      completed: false,
      disabled: false,
      ...getStepState(activeStep, index),
    };
    
    /* State forwarded to alternativeLabel connector if applicable */
    const prevStepState = {
      active: false,
      completed: false,
      disabled: false,
      ...((!controlProps.last && getStepState(activeStep, index + 1)) || {}),
    };

    return [
      !alternativeLabel &&
        connector &&
        index > 0 &&
        React.cloneElement(connector, {
          key: index, // eslint-disable-line react/no-array-index-key
          index,
          ...state,
        }),
      React.cloneElement(step, { ...controlProps, ...step.props, ...state, prevStepState }),
    ];
  });

  return (
    <Paper square elevation={0} className={className} {...other}>
      {steps}
    </Paper>
  );
}

Stepper.propTypes = {
  /**
   * Set the active step (zero based index).
   */
  activeStep: PropTypes.number,
  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Two or more `<Step />` components.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * A component to be placed between each step.
   */
  connector: PropTypes.element,
  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   */
  nonLinear: PropTypes.bool,
  /**
   * The stepper orientation (layout flow direction).
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

Stepper.defaultProps = {
  activeStep: 0,
  alternativeLabel: false,
  connector: <StepConnector />,
  nonLinear: false,
  orientation: 'horizontal',
};

Stepper.muiName = 'Stepper';

export default withStyles(styles, { name: 'MuiStepper' })(Stepper);
