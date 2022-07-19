import * as React from 'react';
import PropTypes from 'prop-types';
import {
  unstable_capitalize as capitalize,
  unstable_useForkRef as useForkRef,
  unstable_useControlled as useControlled,
} from '@mui/utils';
import PopperUnstyled, { PopperUnstyledProps } from '@mui/base/PopperUnstyled';
import {
  useSelect,
  SelectUnstyledContext,
  flattenOptionGroups,
  getOptionsFromChildren,
} from '@mui/base/SelectUnstyled';
import type { SelectChild, SelectOption } from '@mui/base/SelectUnstyled';
import { useSlotProps } from '@mui/base/utils';
import composeClasses from '@mui/base/composeClasses';
import List from '../List/List';
import Sheet from '../Sheet/Sheet';
import Unfold from '../internal/svg-icons/Unfold';
import { styled, useThemeProps } from '../styles';
import { SelectProps, SelectStaticProps } from './SelectProps';
import selectClasses, { getSelectUtilityClass } from './selectClasses';

function defaultRenderSingleValue<TValue>(selectedOption: SelectOption<TValue> | null) {
  return selectedOption?.label ?? '';
}

const useUtilityClasses = (ownerState: SelectStaticProps & { focusVisible: boolean }) => {
  const { color, disabled, focusVisible, size, variant } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    button: ['button'],
    listbox: ['listbox', disabled && 'disabled'],
    popper: ['popper'],
  };

  return composeClasses(slots, getSelectUtilityClass, {});
};

const SelectRoot = styled('div', {
  name: 'JoySelect',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SelectStaticProps }>(({ theme, ownerState }) => [
  {
    '--Select-radius': theme.vars.radius.sm, // radius is used by the decorator children
    '--Select-focusedThickness': 'calc(var(--variant-borderWidth, 1px) + 1px)',
    '--Select-focusedHighlight':
      theme.vars.palette[ownerState.color === 'neutral' ? 'primary' : ownerState.color!]?.[500],
    ...(ownerState.size === 'sm' && {
      '--Select-minHeight': '2rem',
      '--Select-paddingInline': '0.5rem',
    }),
    ...(ownerState.size === 'md' && {
      '--Select-minHeight': '2.5rem',
      '--Select-paddingInline': '0.75rem',
    }),
    ...(ownerState.size === 'lg' && {
      '--Select-minHeight': '3rem',
      '--Select-paddingInline': '1rem',
    }),
    boxSizing: 'border-box',
    minWidth: 0, // forces the Select to stay inside a container by default
    minHeight: 'var(--Select-minHeight)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 'var(--Select-radius)',
    paddingInline: `var(--Select-paddingInline)`,
    fontFamily: theme.vars.fontFamily.body,
    fontSize: theme.vars.fontSize.md,
    ...(ownerState.size === 'sm' && {
      fontSize: theme.vars.fontSize.sm,
    }),
    '&:before': {
      boxSizing: 'border-box',
      content: '""',
      display: 'block',
      position: 'absolute',
      pointerEvents: 'none',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      borderRadius: 'inherit',
      margin: 'calc(var(--variant-borderWidth) * -1)', // for outlined variant
    },
  },
  theme.variants[`${ownerState.variant!}`]?.[ownerState.color!],
  { '&:hover': theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!] },
  {
    [`&.${selectClasses.disabled}`]:
      theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
  },
  ownerState.variant !== 'solid' && {
    [`&.${selectClasses.focusVisible}`]: {
      backgroundColor: 'initial',
      '&:before': {
        boxShadow: `inset 0 0 0 var(--Select-focusedThickness) var(--Select-focusedHighlight)`,
      },
    },
  },
]);

const SelectButton = styled('button', {
  name: 'JoySelect',
  slot: 'Button',
  overridesResolver: (props, styles) => styles.button,
})<{ ownerState: SelectStaticProps }>({
  // reset user-agent button style
  border: 0,
  outline: 'none',
  background: 'none',
  padding: 0,
  fontSize: 'inherit',
  color: 'inherit',
  alignSelf: 'stretch',
  // make children horizontally aligned
  display: 'flex',
  alignItems: 'center',
  flex: 1,
});

const SelectPopper = styled(PopperUnstyled, {
  name: 'JoySelect',
  slot: 'Popper',
  overridesResolver: (props, styles) => styles.popper,
})<{ ownerState: SelectStaticProps }>(({ theme, ownerState }) => ({
  borderRadius: theme.vars.radius.sm,
  ...(ownerState.size === 'sm' && {
    padding: '0.25rem 0',
  }),
  ...(ownerState.size === 'md' && {
    padding: '0.25rem 0',
  }),
  ...(ownerState.size === 'lg' && {
    padding: '0.375rem 0',
  }),
}));

const SelectListbox = styled(List, {
  name: 'JoySelect',
  slot: 'Listbox',
  overridesResolver: (props, styles) => styles.listbox,
})<{ ownerState: SelectStaticProps }>({
  outline: 'none',
  '--List-radius': 'var(--Select-radius)',
});

const Select = React.forwardRef(function Select<TValue>(
  inProps: SelectProps<TValue>,
  ref: React.ForwardedRef<any>,
) {
  const props = useThemeProps({
    props: inProps,
    name: 'JoySelect',
  });

  const {
    autoFocus,
    children,
    component,
    componentsProps = {},
    defaultValue,
    defaultListboxOpen = false,
    disabled: disabledProp,
    listboxId,
    listboxOpen: listboxOpenProp,
    onChange,
    onListboxOpenChange,
    renderValue: renderValueProp,
    value: valueProp,
    size = 'md',
    variant = 'outlined',
    color = 'neutral',
    ...other
  } = props;

  const renderValue = renderValueProp ?? defaultRenderSingleValue;

  const [groupedOptions, setGroupedOptions] = React.useState<SelectChild<TValue>[]>([]);
  const options = React.useMemo(() => flattenOptionGroups(groupedOptions), [groupedOptions]);
  const [listboxOpen, setListboxOpen] = useControlled({
    controlled: listboxOpenProp,
    default: defaultListboxOpen,
    name: 'SelectUnstyled',
    state: 'listboxOpen',
  });

  React.useEffect(() => {
    setGroupedOptions(getOptionsFromChildren(children));
  }, [children]);

  const rootRef = React.useRef<HTMLElement | null>(null);
  const buttonRef = React.useRef<HTMLElement | null>(null);
  const listboxRef = React.useRef<HTMLElement | null>(null);

  const handleRef = useForkRef(ref, rootRef);

  React.useEffect(() => {
    if (autoFocus) {
      buttonRef.current!.focus();
    }
  }, [autoFocus]);

  const handleOpenChange = (isOpen: boolean) => {
    setListboxOpen(isOpen);
    onListboxOpenChange?.(isOpen);
  };

  const {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionProps,
    getOptionState,
    value,
  } = useSelect({
    buttonRef,
    defaultValue,
    disabled: disabledProp,
    listboxId,
    multiple: false,
    onChange,
    onOpenChange: handleOpenChange,
    open: listboxOpen,
    options,
    value: valueProp,
  });

  const ownerState = {
    ...props,
    active: buttonActive,
    defaultListboxOpen,
    disabled,
    focusVisible: buttonFocusVisible,
    open: listboxOpen,
    renderValue,
    value,
    size,
    variant,
    color,
  };

  const classes = useUtilityClasses(ownerState);

  const selectedOptions = React.useMemo(() => {
    return options.find((o) => value === o.value);
  }, [options, value]);

  const rootProps = useSlotProps({
    elementType: SelectRoot,
    getSlotProps: (handlers) => ({
      onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => {
        if (!listboxOpen && event.target !== buttonRef.current && !event.isPropagationStopped()) {
          // show the popup if user click outside of the button element.
          // the close action is already handled by blur event.
          handleOpenChange(true);
        }
        handlers.onClick?.(event);
      },
    }),
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: handleRef,
    },
    ownerState,
    className: classes.root,
  });

  const buttonProps = useSlotProps({
    elementType: SelectButton,
    getSlotProps: getButtonProps,
    externalSlotProps: componentsProps.button,
    ownerState,
    className: classes.button,
  });

  const listboxProps = useSlotProps({
    elementType: SelectListbox,
    getSlotProps: getListboxProps,
    externalSlotProps: componentsProps.listbox,
    additionalProps: {
      ref: listboxRef,
      size,
    },
    ownerState,
    className: classes.listbox,
  });

  const popperProps = useSlotProps({
    elementType: SelectPopper,
    externalSlotProps: componentsProps.popper,
    additionalProps: {
      anchorEl: rootRef.current,
      disablePortal: true,
      open: listboxOpen,
      placement: 'bottom-start' as const,
      role: undefined,
      variant: 'outlined',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
        {
          // popper will have the same width as root element when open
          name: 'equalWidth',
          enabled: true,
          phase: 'beforeWrite',
          requires: ['computeStyles'],
          fn: ({ state }) => {
            state.styles.popper.width = `${state.rects.reference.width}px`;
          },
        },
      ] as PopperUnstyledProps['modifiers'],
    },
    ownerState,
    className: classes.popper,
  });

  const context = {
    getOptionProps,
    getOptionState,
    listboxRef,
  };

  return (
    <React.Fragment>
      <SelectRoot {...rootProps}>
        <SelectButton {...(buttonProps as { ownerState: SelectProps<any> })}>
          {renderValue(selectedOptions!)}
        </SelectButton>
        <Unfold />
      </SelectRoot>
      <SelectPopper component={Sheet} {...popperProps}>
        <SelectListbox {...listboxProps}>
          <SelectUnstyledContext.Provider value={context}>
            {children}
          </SelectUnstyledContext.Provider>
        </SelectListbox>
      </SelectPopper>
    </React.Fragment>
  );
});

Select.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  component: PropTypes.elementType,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    listbox: PropTypes.object,
    popper: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen: PropTypes.bool,
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.object,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * `id` attribute of the listbox element.
   * Also used to derive the `id` attributes of options.
   */
  listboxId: PropTypes.string,
  /**
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen: PropTypes.bool,
  /**
   * Callback fired when an option is selected.
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange: PropTypes.func,
  /**
   * Function that customizes the rendering of the selected value.
   */
  renderValue: PropTypes.func,
  /**
   * The size of the component.
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value: PropTypes.object,
  /**
   * The variant to use.
   * @default 'solid'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Select;
