import * as React from 'react';
import { extendTheme, Palette, styled } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import LightMode from '@mui/icons-material/LightModeOutlined';
import DarkMode from '@mui/icons-material/DarkModeOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

const defaultTheme = extendTheme();

const traverseObject = (palette: Palette) => {
  const result: Record<string, any> = {};
  const traverse = (object: any, parts: string[] = []) => {
    if (object && typeof object === 'object') {
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(object)) {
        traverse(object[key], [...parts, key]);
      }
    } else {
      result[parts.join('.')] = object;
    }
  };
  traverse(palette);
  return result;
};

// https://stackoverflow.com/a/38641281/559913
const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

const Table = styled('table')({
  borderCollapse: 'separate',
  borderSpacing: '8px 0',
  margin: '0 -8px',
  thead: {
    height: 32,
  },
  th: {
    textAlign: 'left',
  },
  td: {
    verticalAlign: 'top',
  },
});

export default function PaletteThemeViewer() {
  const light = traverseObject(defaultTheme.colorSchemes.light.palette);
  const dark = traverseObject(defaultTheme.colorSchemes.dark.palette);
  const paletteTokens = Array.from(
    new Set([...Object.keys(dark), ...Object.keys(light)]),
  ).sort(collator.compare);
  const renderSwatch = (colorScheme: 'light' | 'dark', token: string) => (
    <Box
      component="span"
      data-joy-color-scheme={colorScheme}
      sx={{
        position: 'relative',
        width: '1em',
        height: '1em',
        fontSize: 'var(--Icon-fontSize)',
        borderRadius: '2px',
        backgroundImage: `linear-gradient(90deg, var(--joy-palette-text-tertiary) 50%, transparent 50%), linear-gradient(90deg, transparent 50%, var(--joy-palette-text-tertiary) 50%)`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: '100% 50%, 100% 50%',
        backgroundPosition: '0 0, 0 100%',
        '&::after': {
          content: '""',
          position: 'absolute',
          display: 'block',
          inset: 0,
          bgcolor: token,
          borderRadius: 'inherit',
          boxShadow: 'inset 0 0 0 1px #bababa',
        },
      }}
    />
  );
  return (
    <Box sx={{ width: '100%', overflow: 'auto' }}>
      <Table>
        <thead>
          <tr>
            <th>
              <Typography fontSize="sm">Token</Typography>
            </th>
            <th>
              <Typography fontSize="sm" startDecorator={<LightMode />}>
                Light
              </Typography>
            </th>
            <th>
              <Typography fontSize="sm" startDecorator={<DarkMode />}>
                Dark
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {paletteTokens
            .filter((token) => token !== 'mode')
            .map((token) => (
              <tr key={token}>
                <td>
                  <Typography
                    fontSize="sm"
                    endDecorator={
                      light[token].match(/^[0-9]+\s[0-9]+\s[0-9]+$/) ? (
                        <Tooltip
                          size="sm"
                          arrow
                          title={
                            <Typography>
                              Translucent color usage: <br />
                              <Typography
                                fontFamily="code"
                                component="code"
                                sx={{ py: 1, display: 'block' }}
                              >
                                rgba(var(--joy-palette-{token.replace('.', '-')}) /
                                0.6)
                              </Typography>
                            </Typography>
                          }
                          sx={{ pointerEvents: 'none' }}
                        >
                          <InfoOutlined sx={{ cursor: 'initial' }} />
                        </Tooltip>
                      ) : null
                    }
                  >
                    {token}
                  </Typography>
                </td>
                <td>
                  <Typography
                    level="body2"
                    startDecorator={renderSwatch('light', token)}
                    sx={{ alignItems: 'flex-start' }}
                  >
                    {light[token]}
                  </Typography>
                </td>
                <td>
                  <Typography
                    level="body2"
                    startDecorator={renderSwatch('dark', token)}
                    sx={{ alignItems: 'flex-start' }}
                  >
                    {dark[token]}
                  </Typography>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Box>
  );
}
