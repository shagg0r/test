import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, keyframes } from '@mui/material/styles';
import Section from 'docs/src/layouts/Section';
import GradientText from 'docs/src/components/typography/GradientText';
import TeamStatistics from 'docs/src/components/about/TeamStatistics';

const teamPhotos = [
  {
    img: '/static/blog/2023-chamonix-retreat/skiers.jpeg',
    title: 'MUI team members standing lined-up in the snow with their skigear.',
  },
  {
    img: '/static/blog/2022-tenerife-retreat/group-photo.jpeg',
    title: 'Photo of the MUI team in front of the pool at our accommodations in Tenerife',
  },
  {
    img: '/static/blog/2023-chamonix-retreat/team-dinner.jpeg',
    title: 'Members of the MUI team sitting around a large wooden dining table.',
  },
  {
    img: '/static/about/working-table-tenerife.jpeg',
    title: 'The Toolpad team working together on a heads-down moment in Tenerife.',
  },
  {
    img: '/static/blog/2022-tenerife-retreat/scuba-gear.jpeg',
    title:
      'MUI team members and their diving instructors pose in scuba gear before a successful scuba diving lesson.',
  },
  {
    img: '/static/blog/2022-tenerife-retreat/outdoor-focus-group.jpeg',
    title:
      'An impromptu focus group gathered next to the pool with laptops to discuss cross-team marketing strategies.',
  },
  {
    img: '/static/about/working-table-portugal.jpeg',
    title: 'MUI team members working together on a heads-down moment in Portugal.',
  },
  {
    img: '/static/about/snow-tea.jpeg',
    title: 'The team shares a cup of tea up in the mountains on Chamonix.',
  },
  {
    img: '/static/about/portugal-sight-seeing.jpeg',
    title: 'MUI team selfie while sight seeing in Lisbon, Portugal.',
  },
];

const ImageContainer = styled('div')(() => ({
  display: 'flex',
  gap: 16,
  justifyContent: 'center',
}));

const Image = styled('img')(({ theme }) => ({
  width: 350,
  height: 250,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  boxShadow: `0px 2px 8px ${(theme.vars || theme).palette.grey[200]}`,
  transition: 'all 100ms ease',
  ...theme.applyDarkStyles({
    borderColor: (theme.vars || theme).palette.primaryDark[600],
    boxShadow: `0px 2px 8px ${(theme.vars || theme).palette.common.black}`,
  }),
}));

const scroll = keyframes`
  0% { 
    transform: translateX(0); 
  }
  100% { 
    transform: translateX(-100%)
  }
`;

function PhotoGallery() {
  return (
    <Box
      sx={(theme) => ({
        borderRadius: 1,
        overflow: 'auto',
        position: 'relative',
        minWidth: '100%',
        display: 'flex',
        gap: 2,
        my: 4,
        '> div': {
          animation: `${scroll} 120s linear infinite`,
        },
        '&::before, &::after': {
          background: `linear-gradient(to right, #FFF 0%, rgba(255, 255, 255, 0) 100%)`,
          content: "''",
          height: '100%',
          position: 'absolute',
          width: 200,
          zIndex: 2,
        },
        '&::before': {
          right: -20,
          top: 0,
          transform: 'rotateZ(180deg)',
        },
        '&::after': {
          left: -20,
          top: 0,
        },
        ...theme.applyDarkStyles({
          '&::before, &::after': {
            background: `linear-gradient(to right, ${
              (theme.vars || theme).palette.primaryDark[900]
            } 0%, rgba(0, 0, 0, 0) 100%)`,
          },
        }),
      })}
    >
      <ImageContainer>
        {teamPhotos.map((item, index) => (
          <Image
            key={index}
            src={`${item.img}?w=162&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        ))}
      </ImageContainer>
      <ImageContainer aria-hidden="true">
        {/* aria-hidden is used here because this element is a copy from the above, meaning we want to hide it from screen readers. */}
        {teamPhotos.map((item, index) => (
          <Image
            key={index}
            src={`${item.img}?w=162&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        ))}
      </ImageContainer>
    </Box>
  );
}

export default function AboutHero() {
  return (
    <Section cozy bg="gradient">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" color="primary.600" fontWeight="bold">
          About us
        </Typography>
        <Typography component="h1" variant="h2" sx={{ my: 1, textAlign: 'center' }}>
          We&apos;re on a mission to make <br />{' '}
          <GradientText>building better UIs effortless</GradientText>
        </Typography>
        <Typography
          color="text.secondary"
          textAlign="center"
          sx={{
            maxWidth: { md: 500 },
          }}
        >
          We aim high at enabling developers & designers to bring stunning UIs to life with
          unrivalled speed and ease.
        </Typography>
      </Box>
      <PhotoGallery />
      <TeamStatistics />
    </Section>
  );
}
