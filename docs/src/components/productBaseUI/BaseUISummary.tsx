import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import AccessibilityNewRounded from '@mui/icons-material/AccessibilityNewRounded';
import PhishingRoundedIcon from '@mui/icons-material/PhishingRounded';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import InfoCard from 'docs/src/components/action/InfoCard';

const content = [
  {
    icon: <StyleRoundedIcon color="primary" />,
    title: 'Completely unstyled',
    description: 'Nothing to override—start fresh with any style solution or design system.',
    link: '/base-ui/getting-started/',
  },
  {
    icon: <PhishingRoundedIcon color="primary" />,
    title: 'Low-level hooks',
    description:
      "When it's time to go fully custom, Base UI has you covered with low-level hooks for fine-grained flexibility in component design.",
    link: '/base-ui/getting-started/usage/#components-vs-hooks',
  },
  {
    icon: <AccessibilityNewRounded color="primary" />,
    title: 'Accessibility',
    description:
      'We take accessibility seriously. The Base UI docs are loaded with guidelines and best practices.',
    link: '/base-ui/getting-started/quickstart/#components-and-hooks',
  },
];

export default function BaseUISummary() {
  return (
    <Container sx={{ py: { xs: 6, sm: 10, md: 20 } }}>
      <SectionHeadline
        alwaysCenter
        overline="Why Base UI"
        title={
          <Typography variant="h2" sx={{ mt: 1, maxWidth: 600, mx: 'auto' }}>
            Essential building blocks
            <br /> for <GradientText>sleek and accessible</GradientText> UIs
          </Typography>
        }
        description="Base UI abstracts away the more frustrating aspects of UI development—like accessibility, cross-browser compatibility, and event handling—so you can skip ahead to design implementation."
      />
      <Box sx={{ mt: 8 }}>
        <Grid container spacing={3}>
          {content.map(({ icon, title, description, link }) => (
            <Grid key={title} item xs={12} md={4}>
              <InfoCard link={link} linkable title={title} icon={icon} description={description} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Typography fontWeight={500} textAlign="center" mt={8} mb={2} fontSize="0.875rem">
        Alternative to libraries such as:
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Box
          sx={(theme) => ({
            background: 'url(/static/branding/base-ui/radix.svg)',
            ...theme.applyDarkStyles({
              background: 'url(/static/branding/base-ui/radix-dark.svg)',
            }),
          })}
          width={77}
          height={37}
        />

        <Box
          sx={(theme) => ({
            background: 'url(/static/branding/base-ui/react-aria.svg)',
            ...theme.applyDarkStyles({
              background: 'url(/static/branding/base-ui/react-aria-dark.svg)',
            }),
          })}
          width={113}
          height={37}
        />

        <Box
          sx={(theme) => ({
            background: 'url(/static/branding/base-ui/headless-ui.svg)',
            ...theme.applyDarkStyles({
              background: 'url(/static/branding/base-ui/headless-ui-dark.svg)',
            }),
          })}
          width={116}
          height={37}
        />
      </Box>
    </Container>
  );
}
