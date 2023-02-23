import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';

const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.vars.palette.text.tertiary,
}));

export default function FullWidthGrid() {
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={6} md={8}>
        <Item>xs=6 md=8</Item>
      </Grid>
      <Grid xs={6} md={4}>
        <Item>xs=6 md=4</Item>
      </Grid>
      <Grid xs={6} md={4}>
        <Item>xs=6 md=4</Item>
      </Grid>
      <Grid xs={6} md={8}>
        <Item>xs=6 md=8</Item>
      </Grid>
    </Grid>
  );
}
