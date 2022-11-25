import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp } from '../styles/types';
import { SlotComponentProps } from '../utils/types';

export type ChipSlot = 'root' | 'label' | 'action' | 'startDecorator' | 'endDecorator';

export interface ChipPropsColorOverrides {}
export interface ChipPropsSizeOverrides {}
export interface ChipPropsVariantOverrides {}

interface ComponentsProps {
  root?: SlotComponentProps<'div', {}, ChipOwnerState>;
  label?: SlotComponentProps<'span', {}, ChipOwnerState>;
  action?: SlotComponentProps<
    'button',
    {
      href?: string;
      to?: string;
    },
    ChipOwnerState
  >;
  startDecorator?: SlotComponentProps<'span', {}, ChipOwnerState>;
  endDecorator?: SlotComponentProps<'span', {}, ChipOwnerState>;
}

export interface ChipTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The components used for each slot inside the Chip.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: {
      root?: React.ElementType;
      label?: React.ElementType;
      action?: React.ElementType;
      startDecorator?: React.ElementType;
      endDecorator?: React.ElementType;
    };
    /**
     * The props used for each slot inside.
     * @default {}
     */
    slotProps?: ComponentsProps;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides>;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Element placed after the children.
     */
    endDecorator?: React.ReactNode;
    /**
     * Element action click handler.
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * The size of the component.
     * It accepts theme values between 'sm' and 'lg'.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', ChipPropsSizeOverrides>;
    /**
     * Element placed before the children.
     */
    startDecorator?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The variant to use.
     * @default 'solid'
     */
    variant?: OverridableStringUnion<VariantProp, ChipPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type ChipProps<
  D extends React.ElementType = ChipTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ChipTypeMap<P, D>, D>;

export interface ChipOwnerState extends ChipProps {
  /**
   * If `true`, the chip is clickable.
   */
  clickable: boolean;
  /**
   * If `true`, the action slot's focus is visible.
   */
  focusVisible?: boolean;
}
