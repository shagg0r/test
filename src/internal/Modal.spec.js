// @flow weak

import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import contains from 'dom-helpers/query/contains';
import { createShallow, createMount } from 'src/test-utils';
import Modal, { styleSheet } from './Modal';

describe('<Modal />', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = shallow.context.styleManager.render(styleSheet);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should not show by default', () => {
    assert.strictEqual(Modal.defaultProps.show, false, 'should be false by default');
  });

  it('should render null by default', () => {
    const wrapper = shallow(
      <Modal><p>Hello World</p></Modal>,
    );
    assert.strictEqual(wrapper.node, null, 'should be null');
  });

  describe('show', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Modal show data-my-prop="woof"><p>Hello World</p></Modal>,
      );
    });

    it('should render a portal when shown', () => {
      assert.strictEqual(wrapper.is('Portal'), true, 'should be a Portal');
    });

    it('should render the modal div inside the portal', () => {
      const modal = wrapper.childAt(0);
      assert.strictEqual(modal.is('div'), true, 'should be a div');
      assert.strictEqual(modal.hasClass(classes.modal), true, 'should have the modal class');
    });

    describe('handlers', () => {
      let instance;

      before(() => {
        instance = wrapper.instance();
      });

      describe('focus', () => {
        before(() => {
          instance.modal = spy();
          instance.modal.lastChild = spy();
          instance.modal.lastChild.setAttribute = spy();
          instance.modal.lastChild.focus = spy();
        });

        describe('modalContent has tabIndex attribute', () => {
          let consoleError;
          let consoleErrorSpy;

          before(() => {
            instance.modal.lastChild.hasAttribute = stub().returns(true);
            consoleError = console.error; // eslint-disable-line no-console
            consoleErrorSpy = spy();
            // $FlowFixMe
            console.error = consoleErrorSpy; // eslint-disable-line no-console
            instance.focus();
          });

          after(() => {
            instance.modal.lastChild.hasAttribute.reset();
            instance.modal.lastChild.focus.reset();
            consoleErrorSpy.reset();
            // $FlowFixMe
            console.error = consoleError; // eslint-disable-line no-console
          });

          it('should call hasAttribute with tabIndex', () => {
            assert.strictEqual(instance.modal.lastChild.hasAttribute.callCount, 1);
            assert.strictEqual(instance.modal.lastChild.hasAttribute.calledWith('tabIndex'), true);
          });

          it('should not call setAttribute', () => {
            assert.strictEqual(instance.modal.lastChild.setAttribute.callCount, 0);
          });

          it('should not call console.error', () => {
            assert.strictEqual(consoleErrorSpy.callCount, 0);
          });

          it('should call focus', () => {
            assert.strictEqual(instance.modal.lastChild.focus.callCount, 1);
          });
        });


        describe('modalContent does not have tabIndex attribute', () => {
          let consoleError;
          let consoleErrorSpy;

          before(() => {
            instance.modal.lastChild.hasAttribute = stub().returns(false);
            consoleError = console.error; // eslint-disable-line no-console
            consoleErrorSpy = spy();
            // $FlowFixMe
            console.error = consoleErrorSpy; // eslint-disable-line no-console
            instance.focus();
          });

          after(() => {
            instance.modal.lastChild.hasAttribute.reset();
            consoleErrorSpy.reset();
            // $FlowFixMe
            console.error = consoleError; // eslint-disable-line no-console
          });

          it('should call hasAttribute with tabIndex', () => {
            assert.strictEqual(instance.modal.lastChild.hasAttribute.callCount, 1);
            assert.strictEqual(instance.modal.lastChild.hasAttribute.calledWith('tabIndex'), true);
          });

          it('should call setAttribute', () => {
            assert.strictEqual(instance.modal.lastChild.setAttribute.callCount, 1);
            assert.strictEqual(
              instance.modal.lastChild.setAttribute.calledWith('tabIndex', -1), true);
          });

          it('should call console.error', () => {
            assert.strictEqual(consoleErrorSpy.callCount, 1);
          });

          it('should call focus', () => {
            assert.strictEqual(instance.modal.lastChild.focus.callCount, 1);
          });
        });
      });
    });
  });

  describe('backdrop', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Modal show id="modal">
          <div id="container">
            <h1 id="heading">Hello</h1>
          </div>
        </Modal>,
      );
    });

    it('should render a backdrop wrapped in a fade transition', () => {
      const transition = wrapper.childAt(0).childAt(0);
      assert.strictEqual(transition.is('Fade'), true, 'should be the fade transition');
      assert.strictEqual(transition.prop('in'), true, 'should set the transition to in');
      const backdrop = transition.childAt(0);
      assert.strictEqual(backdrop.is('Backdrop'), true, 'should be the backdrop component');
    });

    it('should pass a transitionDuration prop to the transition component', () => {
      wrapper.setProps({ backdropTransitionDuration: 200 });
      const transition = wrapper.childAt(0).childAt(0);
      assert.strictEqual(transition.props().enterTransitionDuration, 200);
      assert.strictEqual(transition.props().leaveTransitionDuration, 200);
    });

    it('should attach a handler to the backdrop that fires onRequestClose', () => {
      const onRequestClose = spy();
      wrapper.setProps({ onRequestClose });

      const handler = wrapper.instance().handleBackdropClick;
      const backdrop = wrapper.find('Backdrop');
      assert.strictEqual(backdrop.prop('onClick'), handler,
        'should attach the handleBackdropClick handler');

      handler({});
      assert.strictEqual(onRequestClose.callCount, 1, 'should fire the onRequestClose callback');
    });

    it('should let the user disable backdrop click triggering onRequestClose', () => {
      const onRequestClose = spy();
      wrapper.setProps({ onRequestClose, ignoreBackdropClick: true });

      const handler = wrapper.instance().handleBackdropClick;

      handler({});
      assert.strictEqual(onRequestClose.callCount, 0,
        'should not fire the onRequestClose callback');
    });
  });

  describe('mounted', () => {
    describe('show', () => {
      let wrapper;

      before(() => {
        wrapper = mount(
          <Modal id="modal">
            <div id="container">
              <h1 id="heading">Hello</h1>
            </div>
          </Modal>,
        );
      });
      after(() => wrapper.unmount());

      it('should not render the content', () => {
        assert.strictEqual(document.getElementById('container'), null,
          'should not have the element in the DOM');
        assert.strictEqual(document.getElementById('heading'), null,
          'should not have the element in the DOM');
      });

      it('should render the content into the portal', () => {
        wrapper.setProps({ show: true });
        const portalLayer = wrapper.find('Portal').node.layer;
        const container = document.getElementById('container');
        const heading = document.getElementById('heading');

        if (!container || !heading) {
          throw new Error('missing element');
        }

        assert.strictEqual(container.tagName.toLowerCase(), 'div',
          'should have the element in the DOM');
        assert.strictEqual(heading.tagName.toLowerCase(), 'h1',
          'should have the element in the DOM');
        assert.strictEqual(contains(portalLayer, container), true, 'should be in the portal');
        assert.strictEqual(contains(portalLayer, heading), true, 'should be in the portal');
      });

      it('should automatically add a role and tabIndex if not provided', () => {
        const container = document.getElementById('container');

        if (!container) {
          throw new Error('missing container');
        }

        assert.strictEqual(container.getAttribute('role'), 'document',
          'should add the document role');
        assert.strictEqual(container.getAttribute('tabindex'), '-1', 'should add a -1 tab-index');
      });
    });

    describe('backdrop', () => {
      let wrapper;

      before(() => {
        wrapper = mount(
          <Modal show id="modal">
            <div id="container">
              <h1 id="heading">Hello</h1>
            </div>
          </Modal>,
        );
      });
      after(() => wrapper.unmount());

      it('should render a backdrop component into the portal before the modal content', () => {
        const modal = document.getElementById('modal');
        const container = document.getElementById('container');

        if (!modal) {
          throw new Error('missing modal');
        }

        assert.strictEqual(modal.children.length, 2,
          'should have 2 children, the backdrop and the test container');
        assert.ok(modal.children[0],
          'this is the backdrop, so no assertions about implementation details');
        assert.strictEqual(modal.children[1], container, 'should be the container');
      });
    });

    describe('disabled backdrop', () => {
      let wrapper;

      before(() => {
        wrapper = mount(
          <Modal show disableBackdrop id="modal">
            <div id="container">
              <h1 id="heading">Hello</h1>
            </div>
          </Modal>,
        );
      });
      after(() => wrapper.unmount());

      it('should not render a backdrop component into the portal before the modal content', () => {
        const modal = document.getElementById('modal');
        const container = document.getElementById('container');

        if (!modal) {
          throw new Error('missing modal');
        }

        assert.strictEqual(modal.children.length, 1, 'should have 1 child, the test container');
        assert.strictEqual(modal.children[0], container, 'should be the container');
      });
    });
  });
});
