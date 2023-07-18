import * as React from 'react';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

export default function TextBlockSkeleton() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '100px 260px', gap: 1 }}>
      <Skeleton variant="text" level="h1" />
      <Typography level="h1">h1 Typeface</Typography>

      <Skeleton variant="text" level="h2" />
      <Typography level="h2">h2 Typeface</Typography>

      <Skeleton variant="text" level="body1" />
      <Typography level="body1">body1 Typeface</Typography>

      <Skeleton variant="text" level="body2" />
      <Typography level="body2">body2 Typeface</Typography>

      <Skeleton variant="text" level="body3" />
      <Typography level="body3">body3 Typeface</Typography>
    </Box>
  );
}
