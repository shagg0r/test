// @flow weak

import React, { PropTypes, Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import ClockNumber from './ClockNumber';
import ClockPointer from './ClockPointer';
import { getTouchEventOffsetValues, rad2deg } from '../utils/timeUtils';

export const styleSheet = createStyleSheet('ClockMinutes', () => {
  return {
    root: {
      height: '100%',
      width: '100%',
      borderRadius: '100%',
      position: 'relative',
      pointerEvents: 'none',
      boxSizing: 'border-box',
    },

    hitMask: {
      height: '100%',
      width: '100%',
      pointerEvents: 'auto',
    },
  };
});

class ClockMinutes extends Component {
  static propTypes = {
    initialMinutes: PropTypes.number,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    initialMinutes: new Date().getMinutes(),
    onChange: () => {},
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static muiName = 'ClockMinutes';

  componentDidMount() {
    const clockElement = this.mask;

    this.center = {
      x: clockElement.offsetWidth / 2,
      y: clockElement.offsetHeight / 2,
    };

    this.basePoint = {
      x: this.center.x,
      y: 0,
    };
  }

  isMousePressed = (event) => {
    if (typeof event.buttons === 'undefined') {
      return event.nativeEvent.which;
    }
    return event.buttons;
  }

  handleUp = (event) => {
    event.preventDefault();
    this.setClock(event.nativeEvent, true);
  };

  handleMove = (event) => {
    event.preventDefault();
    if (this.isMousePressed(event) !== 1) {
      return;
    }
    this.setClock(event.nativeEvent, false);
  };

  handleTouch = (event) => {
    event.preventDefault();
    this.setClock(event.changedTouches[0], event.type === 'touchend');
  };

  setClock(event, finish) {
    if (typeof event.offsetX === 'undefined') {
      const offset = getTouchEventOffsetValues(event);

      event.offsetX = offset.offsetX;
      event.offsetY = offset.offsetY;
    }

    const minutes = this.getMinutes(event.offsetX, event.offsetY);

    this.props.onChange(minutes, finish);
  }

  getMinutes(offsetX, offsetY) {
    const step = 6;
    const x = offsetX - this.center.x;
    const y = offsetY - this.center.y;
    const cx = this.basePoint.x - this.center.x;
    const cy = this.basePoint.y - this.center.y;

    const atan = Math.atan2(cx, cy) - Math.atan2(x, y);

    let deg = rad2deg(atan);
    deg = Math.round(deg / step) * step;
    deg %= 360;

    const value = Math.floor(deg / step) || 0;

    return value;
  }

  getMinuteNumbers() {
    const minutes = [];
    for (let i = 0; i < 12; i += 1) {
      minutes.push(i * 5);
    }
    const selectedMinutes = this.props.initialMinutes;
    let hasSelected = false;

    const numbers = minutes.map((minute) => {
      const isSelected = selectedMinutes === minute;
      if (isSelected) {
        hasSelected = true;
      }
      return (
        <ClockNumber
          key={minute}
          isSelected={isSelected}
          type="minute"
          value={minute}
        />
      );
    });

    return {
      numbers,
      hasSelected,
      selected: selectedMinutes,
    };
  }

  render() {
    const minutes = this.getMinuteNumbers();
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div ref={(clock) => { this.clock = clock; }} className={classNames(classes.root)} >
        <ClockPointer value={minutes.selected} type="minute" hasSelected={minutes.hasSelected} />
        {minutes.numbers}
        <div
          ref={(mask) => { this.mask = mask; }}
          className={classNames(classes.hitMask)}
          onTouchMove={this.handleTouch}
          onTouchEnd={this.handleTouch}
          onMouseUp={this.handleUp}
          onMouseMove={this.handleMove}
        />
      </div>
    );
  }
}

export default ClockMinutes;
