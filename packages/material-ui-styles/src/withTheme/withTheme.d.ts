import * as React from 'react';
import { ConsistentWith, Omit, PropInjector } from '@material-ui/types';
import { DefaultTheme } from '../defaultTheme';

export interface WithThemeCreatorOption<Theme = DefaultTheme> {
  defaultTheme?: Theme;
}

export function withThemeCreator<Theme = DefaultTheme>(
  option?: WithThemeCreatorOption<Theme>,
): PropInjector<WithTheme<Theme>, Partial<WithTheme<Theme>>>;

export interface WithTheme<Theme = DefaultTheme> {
  theme: Theme;
  innerRef?: React.Ref<any>;
  ref?: React.Ref<any>;
}

export default function withTheme<
  Theme,
  C extends React.ComponentType<ConsistentWith<React.ComponentProps<C>, WithTheme<Theme>>>
>(
  component: C,
): React.ComponentType<
  Omit<JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>, keyof WithTheme<Theme>> &
    Partial<WithTheme<Theme>>
>;
