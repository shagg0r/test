import * as React from 'react';
import useThemeProps from '../styles/useThemeProps';
import GlobalStyles, { GlobalStylesProps } from '../GlobalStyles';

export { css, keyframes } from '@mui/system';

export { default as styled } from '../styles/styled';

export function globalCss(styles: GlobalStylesProps['styles']) {
  return function GlobalStylesWrapper() {
    return <GlobalStyles styles={styles} />;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createUseThemeProps(name: string) {
  return useThemeProps;
}
