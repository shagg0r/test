'use client';
import * as React from 'react';
import { TouchRippleActions } from '../ButtonBase/TouchRipple';
import { useEventCallback } from '../utils';

interface UseTouchRippleProps {
  disabled: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  disableTouchRipple?: boolean;
  focusVisible: boolean;
  rippleRef: React.RefObject<TouchRippleActions>;
}

interface RippleEventHandlers {
  onBlur: React.FocusEventHandler;
  onContextMenu: React.MouseEventHandler;
  onDragLeave: React.DragEventHandler;
  onKeyDown: React.KeyboardEventHandler;
  onKeyUp: React.KeyboardEventHandler;
  onMouseDown: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
  onMouseUp: React.MouseEventHandler;
  onTouchEnd: React.TouchEventHandler;
  onTouchMove: React.TouchEventHandler;
  onTouchStart: React.TouchEventHandler;
}

const useTouchRipple = (props: UseTouchRippleProps) => {
  const {
    disabled,
    disableFocusRipple,
    disableRipple,
    disableTouchRipple,
    focusVisible,
    rippleRef,
  } = props;

  React.useEffect(() => {
    if (focusVisible && !disableFocusRipple && !disableRipple) {
      rippleRef.current?.pulsate();
    }
  }, [rippleRef, focusVisible, disableFocusRipple, disableRipple]);

  function useRippleHandler(
    rippleAction: keyof TouchRippleActions,
    skipRippleAction = disableTouchRipple,
  ) {
    // TODO: uncomment when eslint-plugin-react-compiler //eslint-disable-next-line react-compiler/react-compiler
    return useEventCallback((event: React.SyntheticEvent) => {
      if (!skipRippleAction && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }

      return true;
    });
  }

  const keydownRef = React.useRef(false);
  const handleKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    if (
      !disableFocusRipple &&
      !keydownRef.current &&
      focusVisible &&
      rippleRef.current &&
      event.key === ' '
    ) {
      keydownRef.current = true;
      rippleRef.current.stop(event, () => {
        rippleRef?.current?.start(event);
      });
    }
  });

  const handleKeyUp = useEventCallback((event: React.KeyboardEvent) => {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0
    if (
      !disableFocusRipple &&
      event.key === ' ' &&
      rippleRef.current &&
      focusVisible &&
      !event.defaultPrevented
    ) {
      keydownRef.current = false;
      rippleRef.current.stop(event, () => {
        rippleRef?.current?.pulsate(event);
      });
    }
  });

  // TODO: uncomment when eslint-plugin-react-compiler //eslint-disable-next-line react-compiler/react-compiler
  const handleBlur = useRippleHandler('stop', false);
  // TODO: uncomment when eslint-plugin-react-compiler //eslint-disable-next-line react-compiler/react-compiler
  const handleMouseDown = useRippleHandler('start');
  // TODO: uncomment when eslint-plugin-react-compiler //eslint-disable-next-line react-compiler/react-compiler
  const handleContextMenu = useRippleHandler('stop');
  // TODO: uncomment when eslint-plugin-react-compiler //eslint-disable-next-line react-compiler/react-compiler
  const handleDragLeave = useRippleHandler('stop');
  // TODO: uncomment when eslint-plugin-react-compiler //eslint-disable-next-line react-compiler/react-compiler
  const handleMouseUp = useRippleHandler('stop');
  // TODO: uncomment when eslint-plugin-react-compiler //eslint-disable-next-line react-compiler/react-compiler
  const handleMouseLeave = useRippleHandler('stop');
  // TODO: uncomment when eslint-plugin-react-compiler //eslint-disable-next-line react-compiler/react-compiler
  const handleTouchStart = useRippleHandler('start');
  // TODO: uncomment when eslint-plugin-react-compiler //eslint-disable-next-line react-compiler/react-compiler
  const handleTouchEnd = useRippleHandler('stop');
  // TODO: uncomment when eslint-plugin-react-compiler //eslint-disable-next-line react-compiler/react-compiler
  const handleTouchMove = useRippleHandler('stop');

  const [mountedState, setMountedState] = React.useState(false);

  React.useEffect(() => {
    setMountedState(true);
  }, []);

  const enableTouchRipple = mountedState && !disableRipple && !disabled;

  const getRippleHandlers = React.useMemo(() => {
    const rippleHandlers = {
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onContextMenu: handleContextMenu,
      onDragLeave: handleDragLeave,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchMove: handleTouchMove,
    } as RippleEventHandlers;

    return (otherEvents: Partial<RippleEventHandlers> = {}) => {
      const eventNames = Object.keys(rippleHandlers) as (keyof RippleEventHandlers)[];
      const wrappedEvents = eventNames.map((eventName) => ({
        name: eventName,
        handler: (ev: any) => {
          otherEvents[eventName]?.(ev);
          rippleHandlers[eventName](ev);
        },
      }));

      return wrappedEvents.reduce((acc, current) => {
        acc[current.name] = current.handler;
        return acc;
      }, {} as RippleEventHandlers);
    };
  }, [
    handleBlur,
    handleKeyDown,
    handleKeyUp,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleContextMenu,
    handleDragLeave,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
  ]);

  return {
    enableTouchRipple,
    getRippleHandlers,
  };
};

export default useTouchRipple;
