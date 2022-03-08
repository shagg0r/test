import { ThemeOptions as SystemThemeOptions, Theme as SystemTheme } from '@mui/system';
import { Mixins, MixinsOptions } from './createMixins';
import { Palette, PaletteOptions } from './createPalette';
import { Typography, TypographyOptions } from './createTypography';
import { Shadows } from './shadows';
import { Transitions, TransitionsOptions } from './createTransitions';
import { ZIndex, ZIndexOptions } from './zIndex';
import { Components } from './components';

export interface ThemeOptions extends Omit<SystemThemeOptions, 'zIndex'> {
  mixins?: MixinsOptions;
  components?: Components<BaseTheme>;
  // palette?: PaletteOptions;
  colorSchemes?: Record<string, { palette: PaletteOptions }>;
  shadows?: Shadows;
  transitions?: TransitionsOptions;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
  opacity?: {
    active?: number;
    hover?: number;
    selected?: number;
    disabled?: number;
    focus?: number;
  };
}

interface BaseTheme extends SystemTheme {
  mixins: Mixins;
  palette: Palette;
  shadows: Shadows;
  transitions: Transitions;
  typography: Typography;
  zIndex: ZIndex;
  unstable_strictMode?: boolean;
  colorSchemes: Record<string, { palette: Palette }>;
  opacity: {
    active: number;
    hover: number;
    selected: number;
    disabled: number;
    focus: number;
  };
}

// shut off automatic exporting for the `BaseTheme` above
export {};

/**
 * Our [TypeScript guide on theme customization](https://mui.com/guides/typescript/#customization-of-theme) explains in detail how you would add custom properties.
 */
export interface Theme extends BaseTheme {
  components?: Components<BaseTheme>;
}

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export default function unstable_createTheme(options?: ThemeOptions, ...args: object[]): Theme;
