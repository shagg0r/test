import * as React from 'react';
import { ModalUnstyledOwnProps } from '@mui/base/ModalUnstyled';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotComponentProps } from '../utils/types';

export type ModalSlot = 'root' | 'backdrop';

interface ComponentsProps {
  root?: SlotComponentProps<'div', {}, ModalOwnerState>;
  backdrop?: SlotComponentProps<'div', {}, ModalOwnerState>;
}

export interface ModalTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Pick<
      ModalUnstyledOwnProps,
      | 'children'
      | 'container'
      | 'disableAutoFocus'
      | 'disableEnforceFocus'
      | 'disableEscapeKeyDown'
      | 'disablePortal'
      | 'disableRestoreFocus'
      | 'disableScrollLock'
      | 'hideBackdrop'
      | 'keepMounted'
      | 'open'
    > & {
      /**
       * The components used for each slot inside the Modal.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots?: {
        root?: React.ElementType;
        backdrop?: React.ElementType;
      };
      /**
       * The props used for each slot inside the Modal.
       * @default {}
       */
      slotProps?: ComponentsProps;
      /**
       * Callback fired when the component requests to be closed.
       * The `reason` parameter can optionally be used to control the response to `onClose`.
       *
       * @param {object} event The event source of the callback.
       * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"closeClick"`.
       */
      onClose?: {
        bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown' | 'closeClick'): void;
      }['bivarianceHack'];
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
    };
  defaultComponent: D;
}

export type ModalProps<
  D extends React.ElementType = ModalTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ModalTypeMap<P, D>, D>;

export interface ModalOwnerState extends ModalProps {
  disableAutoFocus: boolean;
  disableEnforceFocus: boolean;
  disableEscapeKeyDown: boolean;
  disablePortal: boolean;
  disableRestoreFocus: boolean;
  disableScrollLock: boolean;
  hideBackdrop: boolean;
  keepMounted: boolean;
}
