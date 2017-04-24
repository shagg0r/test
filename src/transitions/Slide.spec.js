// @flow weak

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import ReactDOM from 'react-dom';
import { createShallow, createMount } from 'src/test-utils';
import Slide from './Slide';
import transitions, { easing, duration } from '../styles/transitions';

describe('<Slide />', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
  });

  it('should render a Transition', () => {
    const wrapper = shallow(<Slide />);
    assert.strictEqual(wrapper.name(), 'Transition');
  });

  it('enterTransitionDuration prop should have default value from standard durations', () => {
    assert.strictEqual(Slide.defaultProps.enterTransitionDuration, duration.enteringScreen);
  });

  it('leaveTransitionDuration prop should have default value from standard durations', () => {
    assert.strictEqual(Slide.defaultProps.leaveTransitionDuration, duration.leavingScreen);
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = [
        'onEnter',
        'onEntering',
        'onEntered',
        'onExit',
        'onExiting',
        'onExited',
      ];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(<Slide {...handlers} />);

      events.forEach((n) => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, { style: {}, getBoundingClientRect: () => ({}) });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });

  describe('transition animation', () => {
    let wrapper;
    let instance;
    let element;
    const enterDuration = 556;
    const leaveDuration = 446;

    before(() => {
      wrapper = shallow(
        <Slide
          enterTransitionDuration={enterDuration}
          leaveTransitionDuration={leaveDuration}
        />,
      );
      instance = wrapper.instance();
      element = {
        getBoundingClientRect: () => ({}),
        style: {},
      };
    });

    it('should create proper easeOut animation onEntering', () => {
      instance.handleEntering(element);
      const animation = transitions.create('transform', {
        duration: enterDuration,
        easing: easing.easeOut,
      });
      assert.strictEqual(element.style.transition, animation);
    });

    it('should create proper sharp animation onExiting', () => {
      instance.handleExiting(element);
      const animation = transitions.create('transform', {
        duration: leaveDuration,
        easing: easing.sharp,
      });
      assert.strictEqual(element.style.transition, animation);
    });
  });

  describe('transition lifecycle', () => {
    let wrapper;
    let instance;

    before(() => {
      wrapper = shallow(<Slide />);
      instance = wrapper.instance();
    });

    describe('handleEnter()', () => {
      let element;

      before(() => {
        element = {
          getBoundingClientRect: () => ({
            width: 500,
            height: 300,
            left: 300,
            right: 500,
            top: 200,
            bottom: 100,
          }),
          style: {},
        };
      });

      it('should set element transform and transition according to the direction', () => {
        wrapper.setProps({ direction: 'left' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(1000px, 0, 0)');
        wrapper.setProps({ direction: 'right' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(-800px, 0, 0)');
        wrapper.setProps({ direction: 'up' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, 400px, 0)');
        wrapper.setProps({ direction: 'down' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, -500px, 0)');
      });
    });

    describe('handleEntering()', () => {
      let element;

      before(() => {
        element = { style: {} };
        instance.handleEntering(element);
      });

      it('should reset the translate3d', () => {
        assert.strictEqual(element.style.transform, 'translate3d(0, 0, 0)');
      });
    });

    describe('handleExiting()', () => {
      let element;

      before(() => {
        element = {
          getBoundingClientRect: () => ({
            width: 500,
            height: 300,
            left: 300,
            right: 500,
            top: 200,
            bottom: 100,
          }),
          style: {},
        };
      });

      it('should set element transform and transition according to the direction', () => {
        wrapper.setProps({ direction: 'left' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(1000px, 0, 0)');
        wrapper.setProps({ direction: 'right' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(-800px, 0, 0)');
        wrapper.setProps({ direction: 'up' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, 400px, 0)');
        wrapper.setProps({ direction: 'down' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, -500px, 0)');
      });
    });
  });

  describe('slidemount', () => {
    let mount;
    let mountWrapper;
    let instance;

    before(() => {
      mount = createMount();
      mountWrapper = mount(<Slide><div /></Slide>);
    });

    after(() => {
      mount.cleanUp();
    });

    it('default value', () => {
      mountWrapper.setProps({ in: false });
      instance = mountWrapper.instance();
      instance.componentDidMount();
      const transitionElement = ReactDOM.findDOMNode(mountWrapper.instance().transition);
      if (transitionElement instanceof window.HTMLElement) {
        assert.strictEqual(transitionElement.style.transform, 'translate3d(0, 0px, 0)');
      } else {
        assert.fail('transition property of instance should be an HTMLElement');
      }
    });

    it('non-default value', () => {
      mountWrapper.setProps({ in: false, direction: 'right' });
      instance = mountWrapper.instance();
      instance.componentDidMount();
      const transitionElement = ReactDOM.findDOMNode(mountWrapper.instance().transition);
      if (transitionElement instanceof window.HTMLElement) {
        assert.strictEqual(transitionElement.style.transform, 'translate3d(0px, 0, 0)');
      } else {
        assert.fail('transition property of instance should be an HTMLElement');
      }
    });
  });
});
