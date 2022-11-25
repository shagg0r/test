import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import { Theme } from './createTheme';
import experimental_extendTheme, { SupportedColorScheme } from './experimental_extendTheme';
import createTypography from './createTypography';
import excludeVariablesFromRoot from './excludeVariablesFromRoot';
import { Theme } from './createTheme';

const shouldSkipGeneratingVar = (keys: string[]) =>
  !!keys[0].match(/(typography|mixins|breakpoints|direction|transitions)/) ||
  (keys[0] === 'palette' && !!keys[1]?.match(/(mode|contrastThreshold|tonalOffset)/));

const defaultTheme = experimental_extendTheme();

const {
  CssVarsProvider,
  NestedCssVarsProvider,
  useColorScheme,
  generateCssThemeVars: systemUseCssThemeVars,
  getInitColorSchemeScript,
} = createCssVarsProvider<SupportedColorScheme>({
  theme: defaultTheme,
  attribute: 'data-mui-color-scheme',
  modeStorageKey: 'mui-mode',
  colorSchemeStorageKey: 'mui-color-scheme',
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  resolveTheme: (theme) => {
    const newTheme = {
      ...theme,
      typography: createTypography(theme.palette, theme.typography),
    };

    return newTheme;
  },
  shouldSkipGeneratingVar,
  excludeVariablesFromRoot,
});

const generateCssThemeVars = systemUseCssThemeVars as typeof systemUseCssThemeVars<Theme>;

export {
  useColorScheme,
  generateCssThemeVars,
  getInitColorSchemeScript,
  shouldSkipGeneratingVar,
  CssVarsProvider as Experimental_CssVarsProvider,
  NestedCssVarsProvider as Experimental_NestedCssVarsProvider,
};
