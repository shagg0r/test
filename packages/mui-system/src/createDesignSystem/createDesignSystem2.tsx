import * as React from 'react';
import { deepmerge } from '@mui/utils';
import createCssVarsProvider from './createCssVarsProvider2';
import createStyled from '../createStyled';

// interface CreateDesignSystem2<
//   BaseTheme extends Record<string, any>,
//   ColorSchemeTokens extends Record<string, any>,
//   SupportedColorScheme extends string,
//   Theme extends Record<string, any> = BaseTheme & ColorSchemeTokens,
// > {
//   (options: {
//     baseTheme: BaseTheme;
//     colorSchemes: Record<SupportedColorScheme, ColorSchemeTokens>;
//     defaultColorScheme: SupportedColorScheme;
//   }): {
//     useTheme: () => Theme;
//     ThemeProvider: (props: React.PropsWithChildren<{ theme: Theme }>) => React.ReactElement;
//     styled: CreateMUIStyled<Theme>;
//   };
// }

type PartialDeep<T extends Record<string, any>> = {
  [K in keyof T]?: T[K] extends Record<string, any> ? PartialDeep<T[K]> : T[K];
};

export default function createDesignSystem2<
  BaseTheme extends Record<string, any>,
  ColorSchemeTokens extends Record<string, any>,
  DefaultColorScheme extends string,
  ColorSchemeOverrides extends string,
  Theme extends Record<string, any> = BaseTheme & ColorSchemeTokens,
>({
  baseTheme,
  colorSchemes,
  defaultColorScheme,
}: {
  baseTheme: BaseTheme;
  colorSchemes: Record<DefaultColorScheme, ColorSchemeTokens> &
    Partial<Record<ColorSchemeOverrides, ColorSchemeTokens>>;
  defaultColorScheme: DefaultColorScheme;
}) {
  let defaultTheme = {
    ...baseTheme,
    ...colorSchemes[defaultColorScheme],
  } as Theme;

  defaultTheme = {
    ...defaultTheme,
    vars: defaultTheme,
  };

  const ThemeContext = React.createContext<Theme>(defaultTheme);

  const useTheme = () => React.useContext(ThemeContext);

  const ThemeProvider = ({
    children,
    theme,
  }: React.PropsWithChildren<{ theme: PartialDeep<Theme> }>) => {
    let mergedTheme = deepmerge(defaultTheme, theme);
    mergedTheme = { ...mergedTheme, vars: mergedTheme };
    return <ThemeContext.Provider value={mergedTheme}>{children}</ThemeContext.Provider>;
  };

  const styled = createStyled<Theme>({ defaultTheme, useTheme });

  return {
    useTheme,
    ThemeProvider,
    styled,
    ...createCssVarsProvider<
      BaseTheme,
      ColorSchemeTokens,
      DefaultColorScheme,
      ColorSchemeOverrides,
      Theme
    >(ThemeContext, {
      baseTheme,
      colorSchemes,
      defaultColorScheme,
    }),
  };
}
