import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

export default function DecoratorExamples() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
    >
      <Typography
        startDecorator={
          <Box
            component="span"
            sx={{
              bgcolor: 'neutral.400',
              width: '0.5em',
              height: '0.5em',
              borderRadius: '50%',
            }}
          />
        }
      >
        Inactive
      </Typography>
      <Typography
        startDecorator={
          <Typography
            sx={{
              fontSize: 'xl4',
              lineHeight: 1,
              fontSize: 'lg',
              alignItems: 'flex-start',
            }}
            textColor="text.secondary"
          >
            $
          </Typography>
        }
      >
        25
      </Typography>
      <Typography
        level="body-sm"
        startDecorator={<InfoOutlined />}
        sx={{ alignItems: 'flex-start', maxWidth: 240, wordBreak: 'break-all' }}
      >
        This example demonstrates multiple lines of the text.
      </Typography>
      <Typography
        variant="soft"
        startDecorator="🚨"
        sx={{
          color: 'danger',
          fontSize: 'sm',
          '--Typography-gap': '0.5rem',
          p: 1,
        }}
      >
        Simple alert using only Typography.
      </Typography>
      <Typography
        sx={{
          color: 'success',
        }}
      >
        <SvgIcon fontSize="md" sx={{ m: '-2px', mr: '2px' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
            />
          </svg>
        </SvgIcon>
        +8.2%
        <Typography level="body-xs" sx={{ ml: 1 }}>
          Since last month
        </Typography>
      </Typography>
    </Box>
  );
}
