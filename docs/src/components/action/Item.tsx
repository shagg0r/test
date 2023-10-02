import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function Group({
  desktopColumns = 1,
  rowLayout = false,
  ...props
}: { desktopColumns?: number; rowLayout?: boolean } & BoxProps) {
  const theme = useTheme();
  return (
    <Box
      {...props}
      sx={{
        maxWidth: rowLayout ? 'none' : { md: 500 },
        overflow: 'auto',
        display: { xs: 'grid', sm: rowLayout ? 'flex' : 'grid' },
        justifyContent: { xs: 'start', sm: rowLayout ? 'center' : null },
        gap: 1,
        gridTemplateColumns: `repeat(${desktopColumns}, 1fr)`,
        '@media (prefers-reduced-motion: no-preference)': {
          scrollBehavior: 'smooth',
        },
        '& > *': {
          minWidth: {
            xs: desktopColumns === 1 ? 300 : 225,
            sm: desktopColumns === 1 ? 400 : 225,
            md: 'auto',
          },
          gridRow: { xs: 1, md: 'auto' },
        },
        [theme.breakpoints.down('md')]: {
          mx: -3,
          px: 3,
          mb: -1.5,
          pb: 2,
          scrollSnapType: 'inline mandatory',
          scrollPaddingLeft: 30,
          scrollPaddingRight: 30,
          '& > *': {
            scrollSnapAlign: 'start',
          },
          '& > *:last-child': {
            position: 'relative',
            '&:after': {
              // to create scroll spacing on the right edge
              content: '""',
              position: 'absolute',
              blockSize: '100%',
              inlineSize: 30,
              insetBlockStart: 0,
              insetInlineEnd: -30,
            },
          },
        },
        [theme.breakpoints.down('sm')]: {
          mx: -2,
          px: 2,
          scrollPaddingLeft: 20,
          scrollPaddingRight: 20,
          '& > *:last-child:after': {
            inlineSize: 20,
            insetBlockStart: 0,
            insetInlineEnd: -20,
          },
        },
        ...props.sx,
      }}
    />
  );
}

export default function Item({
  icon,
  title,
  description,
  ...props
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
} & BoxProps) {
  return (
    <Box
      {...props}
      component="span"
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        ...props.sx,
      }}
    >
      <Box component="span" sx={{ mr: 1.5, lineHeight: 0 }}>
        {icon}
      </Box>
      <span>
        <Typography
          color="text.primary"
          variant="body2"
          fontWeight="bold"
          sx={{ display: 'block' }}
        >
          {title}
        </Typography>
        {description && (
          <Typography color="text.secondary" variant="body2" fontWeight="regular" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        )}
      </span>
    </Box>
  );
}
