import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {createStyleSheet} from 'stylishly/lib/styleSheet';

import YearButton from './YearButton';
import {cloneDate} from './dateUtils';

const styleSheet = createStyleSheet('CalendarYear', (theme) => {
  return {
    root: {
      backgroundColor: theme.datePicker.calendarYearBackgroundColor,
      height: 'inherit',
      lineHeight: '35px',
      overflowX: 'hidden',
      overflowY: 'scroll',
      position: 'relative',
    },
    child: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100%',
    },
  };
});

class CalendarYear extends Component {
  static propTypes = {
    displayDate: PropTypes.object.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onTouchTapYear: PropTypes.func,
    selectedDate: PropTypes.object.isRequired,
    wordings: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.scrollToSelectedYear();
  }

  componentDidUpdate() {
    this.scrollToSelectedYear();
  }

  getYears() {
    const minYear = this.props.minDate.getFullYear();
    const maxYear = this.props.maxDate.getFullYear();

    const years = [];
    const dateCheck = cloneDate(this.props.selectedDate);
    for (let year = minYear; year <= maxYear; year++) {
      dateCheck.setFullYear(year);
      const selected = this.props.selectedDate.getFullYear() === year;

      let selectedProps = {};
      if (selected) {
        selectedProps = {
          ref: 'selectedYearButton',
        };
      }

      const yearButton = (
        <YearButton
          key={`yb${year}`}
          onTouchTap={this.handleTouchTapYear}
          selected={selected}
          year={year}
          {...selectedProps}
        />
      );

      years.push(yearButton);
    }

    return years;
  }

  scrollToSelectedYear() {
    if (this.refs.selectedYearButton === undefined) {
      return;
    }

    const container = findDOMNode(this);
    const yearButtonNode = findDOMNode(this.refs.selectedYearButton);

    const containerHeight = container.clientHeight;
    const yearButtonNodeHeight = yearButtonNode.clientHeight || 32;

    const scrollYOffset = (yearButtonNode.offsetTop + yearButtonNodeHeight / 2) - containerHeight / 2;
    container.scrollTop = scrollYOffset;
  }

  handleTouchTapYear = (event, year) => {
    if (this.props.onTouchTapYear) {
      this.props.onTouchTapYear(event, year);
    }
  };

  render() {
    const classes = this.context.muiTheme.styleManager.render(styleSheet);

    return (
      <div className={classes.root}>
        <div className={classes.child}>
          {this.getYears()}
        </div>
      </div>
    );
  }
}

export default CalendarYear;
