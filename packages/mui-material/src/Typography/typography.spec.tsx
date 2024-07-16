import * as React from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface CustomTypographyVariants {
  ['H1 title']?: React.CSSProperties;
  ['Body L']?: React.CSSProperties;
}

declare module '@mui/material/styles' {
  interface TypographyVariants extends CustomTypographyVariants {}

  interface TypographyVariantsOptions extends CustomTypographyVariants {}
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    ['H1 title']: true;
    ['Body L']: true;
  }
}

const typographyTest = () => {
  const CustomComponent: React.FC<{ prop1: string; prop2: number }> = function CustomComponent() {
    return <div />;
  };

  const CustomComponent2 = ({
    maxLines,
    ...props
  }: TypographyProps & {
    maxLines?: number;
  }): React.JSX.Element => {
    return (
      <Typography
        {...props}
        sx={{
          display: maxLines === 0 ? 'block' : '-webkit-box',
        }}
      />
    );
  };

  return (
    <div>
      <Typography />
      <CustomComponent2 component="span" />
      <CustomComponent2 component="div" />
      <Typography align="inherit" color="inherit" display="block" />
      <Typography align="left" color="initial" display="inline" />
      <Typography align="right" color="primary" display="initial" />
      <Typography align="justify" color="secondary" display="initial" />
      <Typography align="inherit" color="text.primary" />
      <Typography align="inherit" color="text.secondary" />
      <Typography align="inherit" color="error" />
      {/* TODO: system props did not catch this error. Add @ts-expect-error after it is fixed. */}
      <Typography display="incorrectValue" />
      <Typography component="a" href="url" display="block" />
      <Typography component="label" htmlFor="html" display="block" />
      {/* TODO: system props did not catch this error. Add @ts-expect-error after it is fixed. */}
      <Typography component="a" href="url" display="incorrectValue" />
      {/* @ts-expect-error */}
      <Typography component="a" incorrectAttribute="url" />
      {/* @ts-expect-error */}
      <Typography component="incorrectComponent" href="url" />
      {/* @ts-expect-error */}
      <Typography component="div" href="url" />
      {/* @ts-expect-error */}
      <Typography href="url" />
      <Typography component={CustomComponent} prop1="1" prop2={12} />
      {/* @ts-expect-error */}
      <Typography component={CustomComponent} prop1="1" prop2={12} id="1" />
      {/* @ts-expect-error */}
      <Typography component={CustomComponent} prop1="1" />
      {/* @ts-expect-error */}
      <Typography component={CustomComponent} prop1="1" prop2="12" />
      <Typography sx={{ typography: { xs: 'body1', sm: 'h2', md: 'h1', lg: 'body2' } }} />
      {/* @ts-expect-error */}
      <Typography sx={{ typography: { xs: 'body 1', sm: 'h2', md: 'h1', lg: 'body1' } }} />
      <Typography sx={{ typography: { xs: 'Body L', sm: 'h2', md: 'h1', lg: 'body2' } }} />
    </div>
  );
};
