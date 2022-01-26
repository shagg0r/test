import { deepmerge } from '@mui/utils';
import {
  unstable_createCssVarsProvider as createCssVarsProvider,
  BreakpointsOptions,
  SpacingOptions,
} from '@mui/system';
import defaultTheme, {
  lightColorSystem,
  darkColorSystem,
  Focus,
  ThemeScales,
  JoyTheme,
} from './defaultTheme';
import { DefaultColorScheme, ExtendedColorScheme } from './types/colorScheme';
import { Variants } from './types/variants';
import { ColorSystem } from './types/colorSystem';
import { TypographySystem } from './types/typography';
import { Components } from './components';
import { createVariant } from './variantUtils';

type PartialDeep<T> = {
  [K in keyof T]?: PartialDeep<T[K]>;
};

type PartialNested<T> = {
  [K in keyof T]?: {
    [J in keyof T[K]]?: T[K][J];
  };
};

// Use PartialNested instead of PartialDeep because nested value type is CSSObject which does not work with PartialDeep.
type ThemeInput = PartialNested<
  ThemeScales & {
    focus: Focus;
    typography: TypographySystem;
    variants: Variants;
  }
> & {
  breakpoints?: BreakpointsOptions;
  spacing?: SpacingOptions;
  components?: Components<JoyTheme>;
};

type JoyThemeInput = ThemeInput & {
  colorSchemes: Record<DefaultColorScheme, PartialDeep<ColorSystem>>;
};

type ApplicationThemeInput = ThemeInput & {
  colorSchemes: Record<ExtendedColorScheme, PartialDeep<ColorSystem>>;
};

const { palette, ...rest } = defaultTheme;

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  JoyThemeInput,
  DefaultColorScheme,
  ApplicationThemeInput,
  ExtendedColorScheme
>({
  theme: {
    ...rest,
    colorSchemes: {
      light: lightColorSystem,
      dark: darkColorSystem,
    },
  },
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  prefix: 'joy',
  resolveTheme: (mergedTheme: JoyTheme) => {
    mergedTheme.variants = deepmerge(
      {
        text: createVariant('text', mergedTheme),
        textHover: createVariant('textHover', mergedTheme),
        textActive: createVariant('textActive', mergedTheme),
        textDisabled: createVariant('textDisabled', mergedTheme),
        outlined: createVariant('outlined', mergedTheme),
        outlinedHover: createVariant('outlinedHover', mergedTheme),
        outlinedActive: createVariant('outlinedActive', mergedTheme),
        outlinedDisabled: createVariant('outlinedDisabled', mergedTheme),
        light: createVariant('light', mergedTheme),
        lightHover: createVariant('lightHover', mergedTheme),
        lightActive: createVariant('lightActive', mergedTheme),
        lightDisabled: createVariant('lightDisabled', mergedTheme),
        contained: createVariant('contained', mergedTheme),
        containedHover: createVariant('containedHover', mergedTheme),
        containedActive: createVariant('containedActive', mergedTheme),
        containedDisabled: createVariant('containedDisabled', mergedTheme),
      } as typeof mergedTheme.variants,
      mergedTheme.variants,
      { clone: false },
    );
    return mergedTheme;
  },
  shouldSkipGeneratingVar: (keys) =>
    keys[0] === 'typography' ||
    keys[0] === 'variants' ||
    keys[0] === 'focus' ||
    keys[0] === 'breakpoints',
});

export { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
