import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import GradientText from 'docs/src/components/typography/GradientText';

export default function HeroPricing() {
  return (
    <Container sx={{ mb: 8 }}>
      <Box
        sx={{
          height: '40vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="body2" color="primary.main" fontWeight="bold">
          Pricing
        </Typography>
        <Typography variant="h2" sx={{ my: 1 }}>
          Start using <GradientText>MUI</GradientText> for free!
        </Typography>
        <Typography color="text.secondary" textAlign="center" sx={{ maxWidth: 500 }}>
          Switch to a commercial plan to access advanced
          <br /> features & technical support.
        </Typography>
      </Box>
      <Divider />
    </Container>
  );
}
