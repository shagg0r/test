// @flow
import React, {PropTypes, Component, Element} from 'react';
import ReactDOM from 'react-dom';
import transitionInfo from 'dom-helpers/transition/properties';
import addEventListener from 'dom-helpers/events/on';
import ClassNames from 'classnames';

const transitionEndEvent = transitionInfo.end;

export const UNMOUNTED = 0;
export const EXITED = 1;
export const ENTERING = 2;
export const ENTERED = 3;
export const EXITING = 4;

type DefaultProps = {
  in: boolean,
  onExiting: TransitionHandler,
  timeout: number,
  transitionAppear: boolean,
  unmountOnExit: boolean,
  onEnter: TransitionHandler,
  onEntered: TransitionHandler,
  onEntering: TransitionHandler,
  onExit: TransitionHandler,
  onExiting: TransitionHandler,
  onExited: TransitionHandler,
};

type Props = {
  children?: Element,
  className?: string,
  /**
   * CSS class or classes applied when the component is entered
   */
  enteredClassName?: string,
  /**
   * CSS class or classes applied while the component is entering
   */
  enteringClassName?: string,
  /**
   * CSS class or classes applied when the component is exited
   */
  exitedClassName?: string,
  /**
   * CSS class or classes applied while the component is exiting
   */
  exitingClassName?: string,
  /**
   * Show the component; triggers the enter or exit animation
   */
  in?: boolean,
  /**
   * Callback fired before the "entering" classes are applied
   */
  onEnter?: TransitionHandler,
  /**
   * Callback fired after the "enter" classes are applied
   */
  onEntered?: TransitionHandler,
  /**
   * Callback fired after the "entering" classes are applied
   */
  onEntering?: TransitionHandler,
  /**
   * Callback fired before the "exiting" classes are applied
   */
  onExit?: TransitionHandler,
  /**
   * Callback fired after the "exited" classes are applied
   */
  onExited?: TransitionHandler,
  /**
   * Callback fired after the "exiting" classes are applied
   */
  onExiting?: TransitionHandler,
  /**
   * A Timeout for the animation, in milliseconds, to ensure that a node doesn't
   * transition indefinately if the browser transitionEnd events are
   * canceled or interrupted.
   *
   * By default this is set to a high number (5 seconds) as a failsafe. You should consider
   * setting this to the duration of your animation (or a bit above it).
   */
  timeout?: number,
  /**
   * Run the enter animation when the component mounts, if it is initially
   * shown
   */
  transitionAppear?: boolean,
  /**
   * Unmount the component (remove it from the DOM) when it is not shown
   */
  unmountOnExit?: boolean,
};

type State = {
  status: UNMOUNTED | EXITED | ENTERING | ENTERED | EXITING;

}
/**
 * Drawn from https://raw.githubusercontent.com/react-bootstrap/react-overlays/master/src/Transition.js
 *
 * The Transition component lets you define and run css transitions with a simple declarative api.
 * It works similar to React's own CSSTransitionGroup
 * but is specifically optimized for transitioning a single child "in" or "out".
 *
 * You don't even need to use class based css transitions if you don't want to (but it is easiest).
 * The extensive set of lifecyle callbacks means you have control over
 * the transitioning now at each step of the way.
 */
class Transition extends Component<DefaultProps, Props, State> {
  static defaultProps:DefaultProps = {
    in: false,
    unmountOnExit: false,
    transitionAppear: false,

    timeout: 5000,

    onEnter: noop,
    onEntering: noop,
    onEntered: noop,

    onExit: noop,
    onExiting: noop,
    onExited: noop,
  };

  state:State = {
    status: UNMOUNTED,
  };

  componentWillMount() {
    let status;

    if (this.props.in) {
      // Start enter transition in componentDidMount.
      status = this.props.transitionAppear ? EXITED : ENTERED;
    } else {
      status = this.props.unmountOnExit ? UNMOUNTED : EXITED;
    }

    this.setState({status});

    this.nextCallback = null;
  }

  componentDidMount() {
    if (this.props.transitionAppear && this.props.in) {
      this.performEnter(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.in && this.props.unmountOnExit) {
      if (this.state.status === UNMOUNTED) {
        // Start enter transition in componentDidUpdate.
        this.setState({status: EXITED});
      }
    } else {
      this.needsUpdate = true;
    }
  }

  componentDidUpdate() {
    const status = this.state.status;

    if (this.props.unmountOnExit && status === EXITED) {
      // EXITED is always a transitional state to either ENTERING or UNMOUNTED
      // when using unmountOnExit.
      if (this.props.in) {
        this.performEnter(this.props);
      } else {
        this.setState({status: UNMOUNTED}); // eslint-disable-line react/no-did-update-set-state
      }

      return;
    }

    // guard ensures we are only responding to prop changes
    if (this.needsUpdate) {
      this.needsUpdate = false;

      if (this.props.in) {
        if (status === EXITING) {
          this.performEnter(this.props);
        } else if (status === EXITED) {
          this.performEnter(this.props);
        }
        // Otherwise we're already entering or entered.
      } else {
        if (status === ENTERING || status === ENTERED) {
          this.performExit(this.props);
        }
        // Otherwise we're already exited or exiting.
      }
    }
  }

  componentWillUnmount() {
    this.cancelNextCallback();
  }

  props:Props;

  performEnter(props) {
    this.cancelNextCallback();
    const node = ReactDOM.findDOMNode(this);

    // Not this.props, because we might be about to receive new props.
    props.onEnter(node);

    this.safeSetState({status: ENTERING}, () => {
      this.props.onEntering(node);

      this.onTransitionEnd(node, () => {
        this.safeSetState({status: ENTERED}, () => {
          this.props.onEntered(node);
        });
      });
    });
  }

  performExit(props) {
    this.cancelNextCallback();
    const node = ReactDOM.findDOMNode(this);

    // Not this.props, because we might be about to receive new props.
    props.onExit(node);

    this.safeSetState({status: EXITING}, () => {
      this.props.onExiting(node);

      this.onTransitionEnd(node, () => {
        this.safeSetState({status: EXITED}, () => {
          this.props.onExited(node);
        });
      });
    });
  }

  cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  }

  safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    this.setState(nextState, this.setNextCallback(callback));
  }

  setNextCallback(callback) {
    let active = true;

    this.nextCallback = (event) => {
      if (active) {
        active = false;
        this.nextCallback = null;

        callback(event);
      }
    };

    this.nextCallback.cancel = () => {
      active = false;
    };

    return this.nextCallback;
  }

  onTransitionEnd(node, handler) {
    this.setNextCallback(handler);

    if (node) {
      addEventListener(node, transitionEndEvent, this.nextCallback);
      setTimeout(this.nextCallback, this.props.timeout);
    } else {
      setTimeout(this.nextCallback, 0);
    }
  }

  render():Element<any> {
    const status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }

    const {children, className, ...childProps} = this.props;
    Object.keys(Transition.propTypes).forEach((key) => delete childProps[key]);

    let transitionClassName;
    if (status === EXITED) {
      transitionClassName = this.props.exitedClassName;
    } else if (status === ENTERING) {
      transitionClassName = this.props.enteringClassName;
    } else if (status === ENTERED) {
      transitionClassName = this.props.enteredClassName;
    } else if (status === EXITING) {
      transitionClassName = this.props.exitingClassName;
    }

    const child = React.Children.only(children);
    return React.cloneElement(
      child,
      {
        ...childProps,
        className: ClassNames(
          child.props.className,
          className,
          transitionClassName
        ),
      }
    );
  }
}

// Name the function so it is clearer in the documentation
function noop() {}

export default Transition;
