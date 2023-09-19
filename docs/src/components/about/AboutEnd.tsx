import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import Link from 'docs/src/modules/components/Link';
import GradientText from 'docs/src/components/typography/GradientText';
import ROUTES from 'docs/src/route';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';

export default function AboutEnd() {
  return (
    <Section bg="gradient" sx={{ p: { xs: 4, sm: 8 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIdex: 10,
        }}
      >
        <SectionHeadline
          alwaysCenter
          overline="Join us"
          title={
            <Typography variant="h2" sx={{ maxWidth: 600, mx: 'auto' }}>
              Build <GradientText>the next generation</GradientText>
              <br /> of tools for UI development
            </Typography>
          }
          description="Together, we are enabling developers & designers to bring stunning UIs to life with unrivalled speed and ease."
        />
        <Button
          component={Link}
          noLinkStyle
          href={ROUTES.careers}
          endIcon={<KeyboardArrowRightRounded fontSize="small" />}
          variant="contained"
          size="medium"
          sx={{ width: { xs: '100%', sm: 'fit-content' } }}
        >
          View careers
        </Button>
      </Box>
      <Box
        component="img"
        src="/static/branding/about/team-globe-distribution-light.png"
        alt="Illustration of MUI's pricing page."
        loading="lazy"
        width="1100"
        sx={(theme) => ({
          mt: -8,
          display: { xs: 'none', sm: 'block' },
          width: { sm: '100%' },
          ...theme.applyDarkStyles({
            content: 'url(/static/branding/about/team-globe-distribution-dark.png)',
          }),
        })}
      />
    </Section>
  );
}
