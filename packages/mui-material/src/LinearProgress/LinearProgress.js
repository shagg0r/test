'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { darken, lighten } from '@mui/system/colorManipulator';
import { useRtl } from '@mui/system/RtlProvider';
import { keyframes, css, styled, createUseThemeProps } from '../zero-styled';
import capitalize from '../utils/capitalize';
import { getLinearProgressUtilityClass } from './linearProgressClasses';

const useThemeProps = createUseThemeProps('MuiLinearProgress');

const TRANSITION_DURATION = 4; // seconds
const indeterminate1Keyframe = keyframes`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`;
const indeterminate1Animation = css`
  animation: ${indeterminate1Keyframe} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
`;

const indeterminate2Keyframe = keyframes`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`;

const indeterminate2Animation = css`
  animation: ${indeterminate2Keyframe} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
`;

const bufferKeyframe = keyframes`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`;
const bufferAnimation = css`
  animation: ${bufferKeyframe} 3s infinite linear;
`;

const useUtilityClasses = (ownerState) => {
  const { classes, variant, color } = ownerState;

  const slots = {
    root: ['root', `color${capitalize(color)}`, variant],
    dashed: ['dashed', `dashedColor${capitalize(color)}`],
    bar1: [
      'bar',
      `barColor${capitalize(color)}`,
      (variant === 'indeterminate' || variant === 'query') && 'bar1Indeterminate',
      variant === 'determinate' && 'bar1Determinate',
      variant === 'buffer' && 'bar1Buffer',
    ],
    bar2: [
      'bar',
      variant !== 'buffer' && `barColor${capitalize(color)}`,
      variant === 'buffer' && `color${capitalize(color)}`,
      (variant === 'indeterminate' || variant === 'query') && 'bar2Indeterminate',
      variant === 'buffer' && 'bar2Buffer',
    ],
  };

  return composeClasses(slots, getLinearProgressUtilityClass, classes);
};

const getColorShade = (theme, color) => {
  if (theme.vars) {
    return theme.vars.palette.LinearProgress[`${color}Bg`];
  }
  return theme.palette.mode === 'light'
    ? lighten(theme.palette[color].main, 0.62)
    : darken(theme.palette[color].main, 0.5);
};

const LinearProgressRoot = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[`color${capitalize(ownerState.color)}`],
      styles[ownerState.variant],
    ];
  },
})(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  display: 'block',
  height: 4,
  // Fix Safari's bug during composition of different paint.
  zIndex: 0,
  '@media print': {
    colorAdjust: 'exact',
  },
  variants: [
    ...Object.entries(theme.palette)
      .filter(([, value]) => value.main)
      .map(([color]) => ({
        props: { color },
        style: {
          // eslint-disable-next-line no-nested-ternary
          backgroundColor: getColorShade(theme, color),
        },
      })),
    {
      props: ({ ownerState }) => ownerState.color === 'inherit' && ownerState.variant !== 'buffer',
      style: {
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'currentColor',
          opacity: 0.3,
        },
      },
    },
    {
      props: { variant: 'buffer' },
      style: { backgroundColor: 'transparent' },
    },
    {
      props: { variant: 'query' },
      style: { transform: 'rotate(180deg)' },
    },
  ],
}));

const LinearProgressDashed = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Dashed',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.dashed, styles[`dashedColor${capitalize(ownerState.color)}`]];
  },
})(
  ({ theme }) => ({
    position: 'absolute',
    marginTop: 0,
    height: '100%',
    width: '100%',
    backgroundSize: '10px 10px',
    backgroundPosition: '0 -23px',
    variants: [
      {
        props: { color: 'inherit' },
        style: {
          opacity: 0.3,
          backgroundImage: `radial-gradient(currentColor 0%, currentColor 16%, transparent 42%)`,
        },
      },
      ...Object.entries(theme.palette)
        .filter(([, value]) => value.main)
        .map(([color]) => {
          const backgroundColor = getColorShade(theme, color);
          return {
            props: { color },
            style: {
              backgroundImage: `radial-gradient(${backgroundColor} 0%, ${backgroundColor} 16%, transparent 42%)`,
            },
          };
        }),
    ],
  }),
  typeof bufferAnimation !== 'string' && bufferAnimation,
);

const LinearProgressBar1 = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Bar1',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.bar,
      styles[`barColor${capitalize(ownerState.color)}`],
      (ownerState.variant === 'indeterminate' || ownerState.variant === 'query') &&
        styles.bar1Indeterminate,
      ownerState.variant === 'determinate' && styles.bar1Determinate,
      ownerState.variant === 'buffer' && styles.bar1Buffer,
    ];
  },
})(({ theme }) => ({
  width: '100%',
  position: 'absolute',
  left: 0,
  bottom: 0,
  top: 0,
  transition: 'transform 0.2s linear',
  transformOrigin: 'left',
  variants: [
    {
      props: {
        color: 'inherit',
      },
      style: {
        backgroundColor: 'currentColor',
      },
    },
    ...Object.entries(theme.palette)
      .filter(([, value]) => value.main)
      .map(([color]) => ({
        props: { color },
        style: {
          backgroundColor: (theme.vars || theme).palette[color].main,
        },
      })),
    {
      props: {
        variant: 'determinate',
      },
      style: {
        transition: `transform .${TRANSITION_DURATION}s linear`,
      },
    },
    {
      props: {
        variant: 'buffer',
      },
      style: {
        zIndex: 1,
        transition: `transform .${TRANSITION_DURATION}s linear`,
      },
    },
    {
      props: ({ ownerState }) =>
        ownerState.variant === 'indeterminate' || ownerState.variant === 'query',
      style: {
        width: 'auto',
      },
    },
    ...(typeof indeterminate1Animation !== 'string'
      ? [
          {
            props: ({ ownerState }) =>
              ownerState.variant === 'indeterminate' || ownerState.variant === 'query',
            style: indeterminate1Animation,
          },
        ]
      : []),
  ],
}));

const LinearProgressBar2 = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Bar2',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.bar,
      styles[`barColor${capitalize(ownerState.color)}`],
      (ownerState.variant === 'indeterminate' || ownerState.variant === 'query') &&
        styles.bar2Indeterminate,
      ownerState.variant === 'buffer' && styles.bar2Buffer,
    ];
  },
})(({ theme }) => ({
  width: '100%',
  position: 'absolute',
  left: 0,
  bottom: 0,
  top: 0,
  transition: 'transform 0.2s linear',
  transformOrigin: 'left',
  variants: [
    ...Object.entries(theme.palette)
      .filter(([, value]) => value.main)
      .map(([color]) => ({
        props: { color },
        style: {
          '--LinearProgressBar2-barColor': (theme.vars || theme).palette[color].main,
        },
      })),
    {
      props: ({ ownerState }) => ownerState.variant !== 'buffer' && ownerState.color !== 'inherit',
      style: {
        backgroundColor: 'var(--LinearProgressBar2-barColor, currentColor)',
      },
    },
    {
      props: {
        color: 'inherit',
      },
      style: {
        opacity: 0.3,
      },
    },
    ...Object.entries(theme.palette)
      .filter(([, value]) => value.main)
      .map(([color]) => ({
        props: { color, variant: 'buffer' },
        style: {
          backgroundColor: getColorShade(theme, color),
          transition: `transform .${TRANSITION_DURATION}s linear`,
        },
      })),
    {
      props: ({ ownerState }) =>
        ownerState.variant === 'indeterminate' || ownerState.variant === 'query',
      style: {
        width: 'auto',
      },
    },
    ...(typeof indeterminate2Animation !== 'string'
      ? [
          {
            props: ({ ownerState }) =>
              ownerState.variant === 'indeterminate' || ownerState.variant === 'query',
            style: indeterminate2Animation,
          },
        ]
      : []),
  ],
}));

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
const LinearProgress = React.forwardRef(function LinearProgress(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiLinearProgress' });
  const {
    className,
    color = 'primary',
    value,
    valueBuffer,
    variant = 'indeterminate',
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    variant,
  };

  const classes = useUtilityClasses(ownerState);
  const isRtl = useRtl();

  const rootProps = {};
  const inlineStyles = { bar1: {}, bar2: {} };

  if (variant === 'determinate' || variant === 'buffer') {
    if (value !== undefined) {
      rootProps['aria-valuenow'] = Math.round(value);
      rootProps['aria-valuemin'] = 0;
      rootProps['aria-valuemax'] = 100;
      let transform = value - 100;
      if (isRtl) {
        transform = -transform;
      }
      inlineStyles.bar1.transform = `translateX(${transform}%)`;
    } else if (process.env.NODE_ENV !== 'production') {
      console.error(
        'MUI: You need to provide a value prop ' +
          'when using the determinate or buffer variant of LinearProgress .',
      );
    }
  }
  if (variant === 'buffer') {
    if (valueBuffer !== undefined) {
      let transform = (valueBuffer || 0) - 100;
      if (isRtl) {
        transform = -transform;
      }
      inlineStyles.bar2.transform = `translateX(${transform}%)`;
    } else if (process.env.NODE_ENV !== 'production') {
      console.error(
        'MUI: You need to provide a valueBuffer prop ' +
          'when using the buffer variant of LinearProgress.',
      );
    }
  }

  return (
    <LinearProgressRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      role="progressbar"
      {...rootProps}
      ref={ref}
      {...other}
    >
      {variant === 'buffer' ? (
        <LinearProgressDashed
          className={clsx(classes.dashed, typeof bufferAnimation === 'string' && bufferAnimation)}
          ownerState={ownerState}
        />
      ) : null}
      <LinearProgressBar1
        className={clsx(
          classes.bar1,
          typeof indeterminate1Animation === 'string' &&
            (variant === 'indeterminate' || variant === 'query') &&
            indeterminate1Animation,
        )}
        ownerState={ownerState}
        style={inlineStyles.bar1}
      />
      {variant === 'determinate' ? null : (
        <LinearProgressBar2
          className={clsx(
            classes.bar2,
            typeof indeterminate2Animation === 'string' &&
              (variant === 'indeterminate' || variant === 'query') &&
              indeterminate2Animation,
          )}
          ownerState={ownerState}
          style={inlineStyles.bar2}
        />
      )}
    </LinearProgressRoot>
  );
});

LinearProgress.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['inherit', 'primary', 'secondary']),
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
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number,
  /**
   * The value for the buffer variant.
   * Value between 0 and 100.
   */
  valueBuffer: PropTypes.number,
  /**
   * The variant to use.
   * Use indeterminate or query when there is no progress value.
   * @default 'indeterminate'
   */
  variant: PropTypes.oneOf(['buffer', 'determinate', 'indeterminate', 'query']),
};

export default LinearProgress;
