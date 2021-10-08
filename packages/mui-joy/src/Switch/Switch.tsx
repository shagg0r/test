import * as React from 'react';
import { styled } from '@mui/joy/styles';
import SwitchUnstyled, {
  switchUnstyledClasses,
  SwitchUnstyledProps,
} from '@mui/core/SwitchUnstyled';

const Root = styled('span', {
  name: 'JoySwitch',
  slot: 'Root',
  overridesResolver: (styles) => [styles.root],
})(({ theme }) => ({
  '--switch-track-radius': theme.borderRadius.md,
  '--switch-track-width': '88px',
  '--switch-track-height': '40px',
  '--switch-thumb-size': '32px',
  '--switch-base-color': theme.vars.palette.neutral,
  '--switch-checked-color': theme.vars.palette.brand,
  '--switch-thumb-radius': 'calc(var(--switch-track-radius) - 2px)',
  '--switch-thumb-width': 'var(--switch-thumb-size)',
  '--switch-thumb-shadow': '0 0px 2px 0 rgba(0,0,0,0.38)',
  '--switch-thumb-offset': 'max((var(--switch-track-height) - var(--switch-thumb-size)) / 2, 0px)',
  position: 'relative',
  padding:
    'calc((var(--switch-thumb-size) / 2) - (var(--switch-track-height) / 2)) calc(-1 * var(--switch-thumb-offset))',
  color: 'var(--switch-base-color)',
  [`&.${switchUnstyledClasses.checked}`]: {
    color: 'var(--switch-checked-color)',
    [`& .${switchUnstyledClasses.thumb}`]: {
      left: 'calc(50% + var(--switch-track-width) / 2 - var(--switch-thumb-width) / 2 - var(--switch-thumb-offset))',
    },
  },
  [`& .${switchUnstyledClasses.track}`]: {
    position: 'relative',
    color: 'inherit',
    height: 'var(--switch-track-height)',
    width: 'var(--switch-track-width)',
    display: 'block',
    backgroundColor: 'currentColor',
    borderRadius: 'var(--switch-track-radius)',
  },
  [`& .${switchUnstyledClasses.thumb}`]: {
    transition: 'left 0.2s',
    position: 'absolute',
    top: '50%',
    left: 'calc(50% - var(--switch-track-width) / 2 + var(--switch-thumb-width) / 2 + var(--switch-thumb-offset))',
    transform: 'translate(-50%, -50%)',
    width: 'var(--switch-thumb-width)',
    height: 'var(--switch-thumb-size)',
    borderRadius: 'var(--switch-thumb-radius)',
    backgroundColor: '#fff',
    boxShadow: 'var(--switch-thumb-shadow)',
  },
  [`& .${switchUnstyledClasses.input}`]: {
    margin: 0,
    height: '100%',
    width: '100%',
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    cursor: 'pointer',
  },
}));

export default function Switch(props: SwitchUnstyledProps & { sx: any }) {
  return <SwitchUnstyled component={Root} {...props} />;
}
