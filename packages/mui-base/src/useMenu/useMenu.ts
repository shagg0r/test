import * as React from 'react';
import {
  unstable_useForkRef as useForkRef,
  unstable_useId as useId,
  unstable_useEnhancedEffect as useEnhancedEffect,
} from '@mui/utils';
import { UseMenuRootSlotProps, UseMenuParameters, UseMenuReturnValue } from './useMenu.types';
import menuReducer from './menuReducer';
import DropdownContext, { DropdownContextValue } from '../useDropdown/DropdownContext';
import useList from '../useList';
import { MenuItemMetadata } from '../useMenuItem';
import { DropdownActionTypes } from '../useDropdown';
import { EventHandlers } from '../utils';
import { useCompoundParent } from '../utils/useCompound';
import MuiCancellableEvent from '../utils/muiCancellableEvent';
import combineHooksSlotProps from '../utils/combineHooksSlotProps';

const FALLBACK_MENU_CONTEXT: DropdownContextValue = {
  dispatch: () => {},
  popupId: '',
  registerPopup: () => {},
  registerTrigger: () => {},
  state: { open: true },
  triggerElement: null,
};

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/#hooks)
 *
 * API:
 *
 * - [useMenu API](https://mui.com/base-ui/react-menu/hooks-api/#use-menu)
 */
export default function useMenu(parameters: UseMenuParameters = {}): UseMenuReturnValue {
  const { rootRef: rootRefProp, onItemsChange, id: idParam } = parameters;

  const rootRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(rootRef, rootRefProp);

  const listboxId = useId(idParam) ?? '';

  const {
    state: { open },
    dispatch: menuDispatch,
    triggerElement,
    registerPopup,
  } = React.useContext(DropdownContext) ?? FALLBACK_MENU_CONTEXT;

  const { subitems, contextValue: compoundComponentContextValue } = useCompoundParent<
    string,
    MenuItemMetadata
  >();

  const subitemKeys = React.useMemo(() => Array.from(subitems.keys()), [subitems]);

  const getItemDomElement = React.useCallback(
    (itemId: string) => {
      if (itemId == null) {
        return null;
      }

      return subitems.get(itemId)?.ref.current ?? null;
    },
    [subitems],
  );

  const {
    dispatch: listDispatch,
    getRootProps: getListRootProps,
    contextValue: listContextValue,
    state: { highlightedValue },
    rootRef: mergedListRef,
  } = useList({
    disabledItemsFocusable: true,
    focusManagement: 'DOM',
    getItemDomElement,
    getInitialState: () => ({
      selectedValues: [],
      highlightedValue: null,
    }),
    isItemDisabled: (id) => subitems?.get(id)?.disabled || false,
    items: subitemKeys,
    getItemAsString: (id: string) =>
      subitems.get(id)?.label || subitems.get(id)?.ref.current?.innerText,
    rootRef: handleRef,
    onItemsChange,
    reducerActionContext: { listboxRef: rootRef },
    selectionMode: 'none',
    stateReducer: menuReducer,
  });

  useEnhancedEffect(() => {
    registerPopup(listboxId);
  }, [listboxId, registerPopup]);

  React.useEffect(() => {
    if (open && highlightedValue === subitemKeys[0]) {
      subitems.get(subitemKeys[0])?.ref?.current?.focus();
    }
  }, [open, highlightedValue, subitems, subitemKeys]);

  React.useEffect(() => {
    // set focus to the highlighted item (but prevent stealing focus from other elements on the page)
    if (rootRef.current?.contains(document.activeElement) && highlightedValue !== null) {
      subitems?.get(highlightedValue)?.ref.current?.focus();
    }
  }, [highlightedValue, subitems]);

  const createHandleBlur =
    (otherHandlers: EventHandlers) => (event: React.FocusEvent & MuiCancellableEvent) => {
      otherHandlers.onBlur?.(event);
      if (event.defaultMuiPrevented) {
        return;
      }

      if (
        rootRef.current?.contains(event.relatedTarget as HTMLElement) ||
        event.relatedTarget === triggerElement
      ) {
        return;
      }

      menuDispatch({
        type: DropdownActionTypes.blur,
        event,
      });
    };

  const createHandleKeyDown =
    (otherHandlers: EventHandlers) => (event: React.KeyboardEvent & MuiCancellableEvent) => {
      otherHandlers.onKeyDown?.(event);
      if (event.defaultMuiPrevented) {
        return;
      }

      if (event.key === 'Escape') {
        menuDispatch({
          type: DropdownActionTypes.escapeKeyDown,
          event,
        });
      }
    };

  const getOwnRootHandlers = (otherHandlers: EventHandlers = {}) => ({
    onBlur: createHandleBlur(otherHandlers),
    onKeyDown: createHandleKeyDown(otherHandlers),
  });

  const getRootProps = <TOther extends EventHandlers>(
    otherHandlers: TOther = {} as TOther,
  ): UseMenuRootSlotProps => {
    const getCombinedRootProps = combineHooksSlotProps(getOwnRootHandlers, getListRootProps);
    return {
      ...getCombinedRootProps(otherHandlers),
      id: listboxId,
      role: 'menu',
    };
  };

  React.useDebugValue({ subitems, highlightedValue });

  return {
    contextValue: {
      ...compoundComponentContextValue,
      ...listContextValue,
    },
    dispatch: listDispatch,
    getRootProps,
    highlightedValue,
    rootRef: mergedListRef,
    menuItems: subitems,
    open,
    triggerElement,
  };
}
