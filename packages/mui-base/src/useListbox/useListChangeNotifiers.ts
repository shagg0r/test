import * as React from 'react';
import useMessageBus from '../utils/useMessageBus';

const SELECTION_CHANGE_TOPIC = Symbol('change-selection');
const HIGHLIGHT_CHANGE_TOPIC = Symbol('change-highlight');

export interface ListChangeNotifiers<TValue> {
  /**
   * Calls all the registered selection change handlers.
   *
   * @param newValue - The newly selected value(s).
   */
  notifySelectionChanged: (newValue: TValue[]) => void;
  /**
   * Calls all the registered highlight change handlers.
   *
   * @param newValue - The newly highlighted value.
   */
  notifyHighlightChanged: (newValue: TValue | null) => void;

  registerSelectionChangeHandler: (handler: (newValue: TValue[]) => void) => () => void;

  registerHighlightChangeHandler: (handler: (newValue: TValue | null) => void) => () => void;
}

/**
 * @ignore - internal hook.
 *
 * This hook is used to notify any interested components about changes in the Select's selection and highlight.
 */
export default function useSelectChangeNotifiers<Item>(): ListChangeNotifiers<Item> {
  const messageBus = useMessageBus();

  const notifySelectionChanged = React.useCallback(
    (newSelectedItems: Item | Item[] | null) => {
      messageBus.publish(SELECTION_CHANGE_TOPIC, newSelectedItems);
    },
    [messageBus],
  );

  const notifyHighlightChanged = React.useCallback(
    (newHighlightedItem: Item | null) => {
      messageBus.publish(HIGHLIGHT_CHANGE_TOPIC, newHighlightedItem);
    },
    [messageBus],
  );

  const registerSelectionChangeHandler = React.useCallback(
    (handler: (newSelectedItems: Item[]) => void) => {
      return messageBus.subscribe(SELECTION_CHANGE_TOPIC, handler);
    },
    [messageBus],
  );

  const registerHighlightChangeHandler = React.useCallback(
    (handler: (newHighlightedItem: Item | null) => void) => {
      return messageBus.subscribe(HIGHLIGHT_CHANGE_TOPIC, handler);
    },
    [messageBus],
  );

  return {
    notifySelectionChanged,
    notifyHighlightChanged,
    registerSelectionChangeHandler,
    registerHighlightChangeHandler,
  };
}
