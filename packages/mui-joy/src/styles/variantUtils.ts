import { DefaultVariantKey } from './Variant';
import { ColorPaletteProp, DefaultColorPalette } from './ColorSystem';

export const createLightModeVariantVariables = (color: ColorPaletteProp) => ({
  textColor: `var(--joy-palette-${color}-600)`,
  textHoverBg: `var(--joy-palette-neutral-100)`,
  textActiveBg: `var(--joy-palette-neutral-200)`,
  textDisabledColor: `var(--joy-palette-neutral-300)`,

  outlinedColor: `var(--joy-palette-${color}-600)`,
  outlinedBorder: `var(--joy-palette-${color === 'primary' ? 'neutral' : color}-300)`,
  outlinedHoverBg: `var(--joy-palette-${color === 'primary' ? 'neutral' : color}-100)`,
  outlinedHoverBorder: `var(--joy-palette-${color === 'primary' ? 'neutral' : color}-400)`,
  outlinedActiveBg: `var(--joy-palette-${color === 'primary' ? 'neutral' : color}-200)`,
  outlinedDisabledColor: `var(--joy-palette-${color === 'primary' ? 'neutral' : color}-300)`,
  outlinedDisabledBorder: `var(--joy-palette-${color === 'primary' ? 'neutral' : color}-200)`,

  filledColor: `var(--joy-palette-${color}-700)`,
  filledBg: `var(--joy-palette-${color}-100)`,
  filledHoverBg: `var(--joy-palette-${color}-200)`,
  filledActiveBg: `var(--joy-palette-${color}-300)`,
  filledDisabledColor: `var(--joy-palette-${color}-400)`,
  filledDisabledBg: `var(--joy-palette-${color}-50)`,

  containedColor: `#fff`,
  containedBg: `var(--joy-palette-${color}-${color === 'neutral' ? '600' : '500'})`,
  containedHoverBg: `var(--joy-palette-${color}-600)`,
  containedActiveBg: `var(--joy-palette-${color}-400)`,
  containedDisabledBg: `var(--joy-palette-${color}-300)`,
});

export const createDarkModeVariantVariables = (color: ColorPaletteProp) => ({
  textColor: `var(--joy-palette-${color}-200)`,
  textHoverBg: `var(--joy-palette-${color === 'primary' ? 'neutral' : color}-800)`,
  textActiveBg: `var(--joy-palette-${color === 'primary' ? 'neutral' : color}-700)`,
  textDisabledColor: `var(--joy-palette-${color === 'primary' ? 'neutral' : color}-500)`,

  outlinedColor: `var(--joy-palette-${color}-200)`,
  outlinedBorder: `var(--joy-palette-${color === 'primary' ? 'neutral' : color}-700)`,
  outlinedHoverBg: `var(--joy-palette-${color === 'primary' ? 'neutral' : color}-800)`,
  outlinedHoverBorder: `var(--joy-palette-${color === 'primary' ? 'neutral' : color}-600)`,
  outlinedActiveBg: `var(--joy-palette-${color === 'primary' ? 'neutral' : color}-700)`,
  outlinedDisabledColor: `var(--joy-palette-${color === 'primary' ? 'neutral' : color}-500)`,
  outlinedDisabledBorder: `var(--joy-palette-${color === 'primary' ? 'neutral' : color}-800)`,

  filledColor: `var(--joy-palette-${color}-300)`,
  filledBg: `var(--joy-palette-${color}-800)`,
  filledHoverBg: `var(--joy-palette-${color}-700)`,
  filledActiveBg: `var(--joy-palette-${color}-600)`,
  filledDisabledColor: `var(--joy-palette-${color}-500)`,
  filledDisabledBg: `var(--joy-palette-${color}-800)`,

  containedColor: `#fff`,
  containedBg: `var(--joy-palette-${color}-500)`,
  containedHoverBg: `var(--joy-palette-${color}-700)`,
  containedActiveBg: `var(--joy-palette-${color}-500)`,
  containedDisabledBg: `var(--joy-palette-${color}-300)`,
});

export const getTextDefaultVariant = (color: ColorPaletteProp) => ({
  color:
    color === 'context' ? `var(--joy-variant-textColor)` : `var(--joy-palette-${color}-textColor)`,
  backgroundColor:
    color === 'context' ? `var(--joy-variant-textBg)` : `var(--joy-palette-${color}-textBg)`,
});

export const getTextHoverVariant = (color: ColorPaletteProp) => ({
  cursor: 'pointer',
  '&:hover': {
    color:
      color === 'context'
        ? `var(--joy-variant-textHoverColor, var(--joy-variant-textColor))`
        : `var(--joy-palette-${color}-textHoverColor, var(--joy-palette-${color}-textColor))`,
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-textHoverBg)`
        : `var(--joy-palette-${color}-textHoverBg)`,
  },
});

export const getTextActiveVariant = (color: ColorPaletteProp) => ({
  '&:active': {
    color:
      color === 'context'
        ? `var(--joy-variant-textActiveColor, var(--joy-variant-textColor))`
        : `var(--joy-palette-${color}-textActiveColor, var(--joy-palette-${color}-textColor))`,
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-textActiveBg)`
        : `var(--joy-palette-${color}-textActiveBg)`,
  },
});

export const getTextDisabledVariant = (color: ColorPaletteProp) => ({
  '&.Mui-disabled': {
    color:
      color === 'context'
        ? `var(--joy-variant-textDisabledColor)`
        : `var(--joy-palette-${color}-textDisabledColor)`,
  },
});

export const getOutlinedDefaultVariant = (color: ColorPaletteProp) => ({
  color:
    color === 'context'
      ? `var(--joy-variant-outlinedColor)`
      : `var(--joy-palette-${color}-outlinedColor)`,
  border: '1px solid',
  borderColor:
    color === 'context'
      ? `var(--joy-variant-outlinedBorder)`
      : `var(--joy-palette-${color}-outlinedBorder)`,
  backgroundColor:
    color === 'context'
      ? `var(--joy-variant-outlinedBg)`
      : `var(--joy-palette-${color}-outlinedBg)`,
});

export const getOutlinedHoverVariant = (color: ColorPaletteProp) => ({
  cursor: 'pointer',
  '&:hover': {
    color:
      color === 'context'
        ? `var(--joy-variant-outlinedHoverColor, var(--joy-variant-outlinedColor))`
        : `var(--joy-palette-${color}-outlinedHoverColor, var(--joy-palette-${color}-outlinedColor))`,
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-outlinedHoverBg)`
        : `var(--joy-palette-${color}-outlinedHoverBg)`,
    borderColor:
      color === 'context'
        ? `var(--joy-variant-outlinedHoverBorder)`
        : `var(--joy-palette-${color}-outlinedHoverBorder)`,
  },
});

export const getOutlinedActiveVariant = (color: ColorPaletteProp) => ({
  '&:active': {
    color:
      color === 'context'
        ? `var(--joy-variant-outlinedActiveColor, var(--joy-variant-outlinedColor))`
        : `var(--joy-palette-${color}-outlinedActiveColor, var(--joy-palette-${color}-outlinedColor))`,
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-outlinedActiveBg)`
        : `var(--joy-palette-${color}-outlinedActiveBg)`,
  },
});

export const getOutlinedDisabledVariant = (color: ColorPaletteProp) => ({
  '&.Mui-disabled': {
    color:
      color === 'context'
        ? `var(--joy-variant-outlinedDisabledColor)`
        : `var(--joy-palette-${color}-outlinedDisabledColor)`,
    borderColor:
      color === 'context'
        ? `var(--joy-variant-outlinedDisabledBorder)`
        : `var(--joy-palette-${color}-outlinedDisabledBorder)`,
  },
});

export const getFilledDefaultVariant = (color: ColorPaletteProp) => ({
  color:
    color === 'context'
      ? `var(--joy-variant-filledColor)`
      : `var(--joy-palette-${color}-filledColor)`,
  backgroundColor:
    color === 'context' ? `var(--joy-variant-filledBg)` : `var(--joy-palette-${color}-filledBg)`,
});

export const getFilledHoverVariant = (color: ColorPaletteProp) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-filledHoverBg)`
        : `var(--joy-palette-${color}-filledHoverBg)`,
  },
});

export const getFilledActiveVariant = (color: ColorPaletteProp) => ({
  '&:active': {
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-filledActiveBg)`
        : `var(--joy-palette-${color}-filledActiveBg)`,
  },
});

export const getFilledDisabledVariant = (color: ColorPaletteProp) => ({
  '&.Mui-disabled': {
    color:
      color === 'context'
        ? `var(--joy-variant-filledDisabledColor)`
        : `var(--joy-palette-${color}-filledDisabledColor)`,
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-filledDisabledBg)`
        : `var(--joy-palette-${color}-filledDisabledBg)`,
  },
});

export const getContainedDefaultVariant = (color: ColorPaletteProp) => ({
  color:
    color === 'context'
      ? `var(--joy-variant-containedColor)`
      : `var(--joy-palette-${color}-containedColor)`,
  backgroundColor:
    color === 'context'
      ? `var(--joy-variant-containedBg)`
      : `var(--joy-palette-${color}-containedBg)`,
});

export const getContainedHoverVariant = (color: ColorPaletteProp) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-containedHoverBg)`
        : `var(--joy-palette-${color}-containedHoverBg)`,
  },
});

export const getContainedActiveVariant = (color: ColorPaletteProp) => ({
  '&:active': {
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-containedActiveBg)`
        : `var(--joy-palette-${color}-containedActiveBg)`,
  },
});

export const getContainedDisabledVariant = (color: ColorPaletteProp) => ({
  '&.Mui-disabled': {
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-containedDisabledBg)`
        : `var(--joy-palette-${color}-containedDisabledBg)`,
  },
});

export const getContainedOverrides = (color: ColorPaletteProp) => ({
  // typography
  '--joy-palette-letter-major': `#fff`,
  '--joy-palette-letter-minor': `var(--joy-palette-${color}-100)`,
  '--joy-palette-letter-support': `var(--joy-palette-${color}-200)`,

  // other variants
  '--joy-variant-textColor': `var(--joy-palette-${color}-100)`,
  '--joy-variant-textBg': `transparent`,
  '--joy-variant-textHoverBg': `var(--joy-palette-${color}-${color === 'neutral' ? '500' : '400'})`,
  '--joy-variant-textActiveBg': `var(--joy-palette-${color}-700)`,
  '--joy-variant-outlinedColor': `#fff`,
  '--joy-variant-outlinedBorder': `var(--joy-palette-${color}-400)`,
  '--joy-variant-outlinedHoverBorder': `var(--joy-palette-${color}-400)`,
  '--joy-variant-outlinedBg': `transparent`,
  '--joy-variant-outlinedHoverBg': `rgba(255, 255, 255, 0.12)`,
  '--joy-variant-outlinedActiveBg': `var(--joy-palette-${color}-700)`,
  '--joy-variant-filledColor': `#fff`,
  '--joy-variant-filledBg': `rgba(255, 255, 255, 0.2)`,
  '--joy-variant-filledHoverBg': `var(--joy-palette-${color}-400)`,
  '--joy-variant-filledActiveBg': `var(--joy-palette-${color}-400)`,
});

export const createVariant = (variant: DefaultVariantKey) => {
  const colors: DefaultColorPalette[] = [
    'neutral',
    'primary',
    'danger',
    'info',
    'success',
    'warning',
    'context',
  ];
  let result = {} as Record<DefaultColorPalette, object>;
  const generatorMap: Record<DefaultVariantKey, Function> = {
    text: getTextDefaultVariant,
    textHover: getTextHoverVariant,
    textActive: getTextActiveVariant,
    textDisabled: getTextDisabledVariant,
    outlined: getOutlinedDefaultVariant,
    outlinedHover: getOutlinedHoverVariant,
    outlinedActive: getOutlinedActiveVariant,
    outlinedDisabled: getOutlinedDisabledVariant,
    filled: getFilledDefaultVariant,
    filledHover: getFilledHoverVariant,
    filledActive: getFilledActiveVariant,
    filledDisabled: getFilledDisabledVariant,
    contained: getContainedDefaultVariant,
    containedHover: getContainedHoverVariant,
    containedActive: getContainedActiveVariant,
    containedDisabled: getContainedDisabledVariant,
    containedOverrides: getContainedOverrides,
  };
  colors.forEach((color) => {
    // no need to add context node inside `containedOverrides`
    if (color !== 'context' || (color === 'context' && variant !== 'containedOverrides')) {
      result = { ...result, [color]: generatorMap[variant](color) };
    }
  });
  return result;
};
