import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import {
  getClasses,
  createMount,
  createClientRender,
  act,
  fireEvent,
  screen,
  cleanup,
  describeConformance,
} from 'test/utils';
import Icon from '@material-ui/core/Icon';
import SpeedDial from './SpeedDial';
import SpeedDialAction from '../SpeedDialAction';

describe('<SpeedDial />', () => {
  // StrictModeViolation: not using act(), prefer test/utils/createClientRender
  const mount = createMount({ strict: false });
  const render = createClientRender({ strict: false });
  let classes;

  const icon = <Icon>font_icon</Icon>;
  const FakeAction = () => <div />;
  const defaultProps = {
    open: true,
    icon,
    ariaLabel: 'mySpeedDial',
  };

  before(() => {
    classes = getClasses(
      <SpeedDial {...defaultProps}>
        <div />
      </SpeedDial>,
    );
  });

  describeConformance(<SpeedDial {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: [
      'componentProp', // react-transition-group issue
      'reactTestRenderer',
    ],
  }));

  it('should render a Fade transition', () => {
    const { container } = render(
      <SpeedDial {...defaultProps}>
        <FakeAction />
      </SpeedDial>,
    );

    expect(container.firstChild.tagName).to.equal('DIV');
  });

  it('should render a Fab', () => {
    const { getByRole } = render(
      <SpeedDial {...defaultProps}>
        <FakeAction />
      </SpeedDial>,
    );
    expect(getByRole('button', { expanded: true })).not.to.equal(null);
  });

  it('should render with a null child', () => {
    const { getByRole, getAllByRole } = render(
      <SpeedDial {...defaultProps}>
        <SpeedDialAction icon={icon} tooltipTitle="One" />
        {null}
        <SpeedDialAction icon={icon} tooltipTitle="Three" />
      </SpeedDial>,
    );
    expect(getByRole('menu').children).to.have.lengthOf(2);
    expect(getAllByRole('menuitem')).to.have.lengthOf(2);
  });

  it('should pass the open prop to its children', () => {
    const actionClasses = { fabClosed: 'is-closed' };
    const { getAllByRole } = render(
      <SpeedDial {...defaultProps}>
        <SpeedDialAction classes={actionClasses} icon={icon} tooltipTitle="SpeedDialAction1" />
        <SpeedDialAction classes={actionClasses} icon={icon} tooltipTitle="SpeedDialAction2" />
      </SpeedDial>,
    );
    const actions = getAllByRole('menuitem');
    expect(actions).to.have.lengthOf(2);
    expect(actions.map((element) => element.className)).not.to.contain('is-closed');
  });

  describe('prop: onKeyDown', () => {
    it('should be called when a key is pressed', () => {
      const handleKeyDown = spy();
      const { getByRole } = render(
        <SpeedDial {...defaultProps} onKeyDown={handleKeyDown}>
          <FakeAction />
        </SpeedDial>,
      );
      const buttonWrapper = getByRole('button', { expanded: true });
      act(() => {
        fireEvent.keyDown(document.body, { key: 'TAB' });
        buttonWrapper.focus();
      });
      fireEvent.keyDown(buttonWrapper, { key: ' ' });
      expect(handleKeyDown.callCount).to.equal(1);
      expect(handleKeyDown.calledWithMatch({ key: ' ' })).to.equal(true);
    });
  });

  describe('prop: direction', () => {
    [
      ['up', 'directionUp'],
      ['down', 'directionDown'],
      ['left', 'directionLeft'],
      ['right', 'directionRight'],
    ].forEach(([direction, className]) => {
      it(`should place actions in the correct position when direction=${direction}`, () => {
        const { getByRole } = render(
          <SpeedDial {...defaultProps} direction={direction.toLowerCase()}>
            <SpeedDialAction icon={icon} tooltipTitle="action1" />
            <SpeedDialAction icon={icon} tooltipTitle="action2" />
          </SpeedDial>,
        );
        expect(getByRole('presentation')).to.have.class(classes[className]);
      });
    });
  });

  describe('keyboard', () => {
    let clock;

    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should open the speed dial and move to the first action without closing', () => {
      const handleOpen = spy();
      const { getByRole, getAllByRole } = render(
        <SpeedDial ariaLabel="mySpeedDial" onOpen={handleOpen}>
          <SpeedDialAction tooltipTitle="action1" />
          <SpeedDialAction tooltipTitle="action2" />
        </SpeedDial>,
      );
      const fab = getByRole('button');
      fab.focus();
      act(() => {
        clock.tick();
      });
      expect(handleOpen.callCount).to.equal(1);
      const actions = getAllByRole('menuitem');
      expect(actions.length).to.equal(2);
      fireEvent.keyDown(fab, { key: 'ArrowUp' });
      expect(document.activeElement).to.equal(actions[0]);
      expect(fab).to.have.attribute('aria-expanded', 'true');
    });
  });

  describe('dial focus', () => {
    let actionRefs;
    let dialButtonRef;
    let onkeydown;

    const renderSpeedDial = (direction = 'up', actionCount = 4) => {
      actionRefs = [];
      dialButtonRef = undefined;
      onkeydown = spy();

      render(
        <SpeedDial
          {...defaultProps}
          FabProps={{
            ref: (ref) => {
              dialButtonRef = ref;
            },
          }}
          direction={direction}
          onKeyDown={onkeydown}
        >
          {Array.from({ length: actionCount }, (_, i) => (
            <SpeedDialAction
              key={i}
              FabProps={{
                ref: (ref) => {
                  actionRefs[i] = ref;
                },
              }}
              icon={icon}
              data-test={i}
              tooltipTitle={`action${i}`}
            />
          ))}
        </SpeedDial>,
      );
    };

    /**
     * @returns the button of SpeedDial
     */
    const getDialButton = () => screen.getByRole('button', { name: 'mySpeedDial' });
    /**
     *
     * @param actionIndex
     * @returns the button of the nth SpeedDialAction or the Fab if -1
     */
    const getActionButton = (actionIndex) => {
      if (actionIndex === -1) {
        return getDialButton();
      }
      return screen.getAllByRole('menuitem')[actionIndex];
    };
    /**
     * @returns true if the button of the nth action is focused
     */
    const isActionFocused = (index) => {
      const expectedFocusedElement = index === -1 ? dialButtonRef : actionRefs[index];
      return expectedFocusedElement === window.document.activeElement;
    };

    const resetDialToOpen = (direction) => {
      cleanup();

      renderSpeedDial(direction);
      dialButtonRef.focus();
    };

    it('displays the actions on focus gain', () => {
      resetDialToOpen();
      expect(screen.getAllByRole('menuitem')).to.have.lengthOf(4);
      expect(screen.getByRole('menu')).not.to.have.class(classes.actionsClosed);
    });

    describe('first item selection', () => {
      it('considers arrow keys with the same initial orientation', () => {
        resetDialToOpen();
        fireEvent.keyDown(getDialButton(), { key: 'left' });
        expect(isActionFocused(0)).to.equal(true);
        fireEvent.keyDown(getActionButton(0), { key: 'up' });
        expect(isActionFocused(0)).to.equal(true);
        fireEvent.keyDown(getActionButton(0), { key: 'left' });
        expect(isActionFocused(1)).to.equal(true);
        fireEvent.keyDown(getActionButton(1), { key: 'right' });
        expect(isActionFocused(0)).to.equal(true);
      });
    });

    // eslint-disable-next-line func-names
    describe('actions navigation', () => {
      // this.timeout(5000); // These tests are really slow.

      /**
       * tests a combination of arrow keys on a focused SpeedDial
       */
      const testCombination = (
        dialDirection,
        [firstKey, ...combination],
        [firstFocusedAction, ...foci],
      ) => {
        resetDialToOpen(dialDirection);

        fireEvent.keyDown(getDialButton(), { key: firstKey });
        expect(isActionFocused(firstFocusedAction)).to.equal(
          true,
          `focused action initial ${firstKey} should be ${firstFocusedAction}`,
        );

        combination.forEach((arrowKey, i) => {
          const previousFocusedAction = foci[i - 1] || firstFocusedAction;
          const expectedFocusedAction = foci[i];
          const combinationUntilNot = [firstKey, ...combination.slice(0, i + 1)];

          fireEvent.keyDown(getActionButton(previousFocusedAction), {
            key: arrowKey,
          });
          expect(isActionFocused(expectedFocusedAction)).to.equal(
            true,
            `focused action after ${combinationUntilNot.join(
              ',',
            )} should be ${expectedFocusedAction}`,
          );
        });
      };

      const itTestCombination = (dir, keys, expected) => {
        it(`Start dir ${dir} with keys ${keys.join(',')}`, () => {
          testCombination(dir, keys, expected);
        });
      };

      describe('considers the first arrow key press as forward navigation', () => {
        itTestCombination('up', ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowDown'], [0, 1, 2, 1]);
        itTestCombination('up', ['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowUp'], [0, 1, 2, 1]);

        itTestCombination(
          'right',
          ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowLeft'],
          [0, 1, 2, 1],
        );
        itTestCombination(
          'right',
          ['ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowRight'],
          [0, 1, 2, 1],
        );

        itTestCombination('down', ['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowUp'], [0, 1, 2, 1]);
        itTestCombination('down', ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowDown'], [0, 1, 2, 1]);

        itTestCombination(
          'left',
          ['ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowRight'],
          [0, 1, 2, 1],
        );
        itTestCombination(
          'left',
          ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowLeft'],
          [0, 1, 2, 1],
        );
      });

      describe('ignores array keys orthogonal to the direction', () => {
        itTestCombination('up', ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowUp'], [0, 0, 0, 1]);
        itTestCombination(
          'right',
          ['ArrowRight', 'ArrowUp', 'ArrowDown', 'ArrowRight'],
          [0, 0, 0, 1],
        );
        itTestCombination(
          'down',
          ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowDown'],
          [0, 0, 0, 1],
        );
        itTestCombination('left', ['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowLeft'], [0, 0, 0, 1]);
      });

      describe('does not wrap around', () => {
        itTestCombination('up', ['ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowUp'], [0, -1, -1, 0]);
        itTestCombination(
          'right',
          ['ArrowRight', 'ArrowLeft', 'ArrowLeft', 'ArrowRight'],
          [0, -1, -1, 0],
        );
        itTestCombination('down', ['ArrowDown', 'ArrowUp', 'ArrowUp', 'ArrowDown'], [0, -1, -1, 0]);
        itTestCombination(
          'left',
          ['ArrowLeft', 'ArrowRight', 'ArrowRight', 'ArrowLeft'],
          [0, -1, -1, 0],
        );
      });
    });
  });
});
