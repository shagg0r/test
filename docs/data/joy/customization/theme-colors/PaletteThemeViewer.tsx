/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { extendTheme, Palette, styled } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import LightMode from '@mui/icons-material/LightModeOutlined';
import DarkMode from '@mui/icons-material/DarkModeOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import useClipboardCopy from 'docs/src/modules/utils/useClipboardCopy';

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

const Table = styled('table')(({ theme }) => ({
  borderCollapse: 'separate',
  borderSpacing: 0,
  display: 'block',
  height: 500,
  overflowY: 'scroll',
  th: {
    textAlign: 'left',
    padding: 8,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    ...theme.variants.soft.neutral,
  },
  td: {
    verticalAlign: 'top',
    padding: '3px 6px',
  },
  tr: {
    '&:hover': {
      backgroundColor: theme.vars.palette.background.level1,
    },
    '&:first-of-type': {
      '& td': { paddingTop: 6 },
    },
  },
}));

export default function PaletteThemeViewer() {
  const { copy, isCopied } = useClipboardCopy();
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
    <Box
      sx={{
        marginBottom: '-9px',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid',
        borderColor: 'divider',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
      }}
    >
      <Sheet
        variant="solid"
        color="success"
        sx={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: `translateX(-50%) translateY(${
            isCopied ? '-0.5rem' : 'calc(100% + 0.5rem)'
          })`,
          transition: '0.3s',
          p: 0.5,
          pl: 0.5,
          pr: 1,
          borderRadius: 'xl',
          boxShadow: 'md',
          zIndex: 1,
        }}
      >
        <Typography
          level="body-xs"
          textColor="inherit"
          startDecorator={
            <CheckCircleRoundedIcon
              sx={{
                fontSize: 'small',
              }}
            />
          }
        >
          Copied
        </Typography>
      </Sheet>
      <Table>
        <thead>
          <tr>
            <th>
              <Typography
                sx={{
                  fontSize: 'sm',
                }}
                textColor="inherit"
              >
                Token
              </Typography>
            </th>
            <th>
              <Typography
                sx={{
                  fontSize: 'sm',
                }}
                startDecorator={<LightMode />}
                textColor="inherit"
              >
                Light
              </Typography>
            </th>
            <th>
              <Typography
                sx={{
                  fontSize: 'sm',
                }}
                startDecorator={<DarkMode />}
                textColor="inherit"
              >
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
                  <Link
                    component="button"
                    color="neutral"
                    textColor="inherit"
                    onClick={() => copy(token)}
                    endDecorator={
                      light[token].match(/^[0-9]+\s[0-9]+\s[0-9]+$/) ? (
                        <Tooltip
                          size="sm"
                          arrow
                          title={
                            <Typography>
                              Translucent color usage: <br />
                              <Typography
                                sx={{
                                  fontSize: 'sm',
                                  fontWeight: 'md',
                                  textAlign: 'left',
                                  fontFamily: 'code',
                                  py: 1,
                                  display: 'block',
                                }}
                                component="code"
                              >
                                rgba(var(--joy-palette-{token.replace('.', '-')}) /
                                0.6)
                              </Typography>
                            </Typography>
                          }
                        >
                          <InfoOutlined />
                        </Tooltip>
                      ) : null
                    }
                  >
                    {token}
                  </Link>
                </td>
                <td>
                  <Link
                    component="button"
                    color="neutral"
                    textColor="inherit"
                    startDecorator={renderSwatch('light', token)}
                    sx={{
                      fontSize: 'xs',
                      fontFamily: 'code',
                      textAlign: 'left',
                      alignItems: 'flex-start',
                      cursor: 'copy',
                    }}
                    onClick={() => copy(light[token])}
                  >
                    {light[token]}
                  </Link>
                </td>
                <td>
                  <Link
                    component="button"
                    color="neutral"
                    textColor="inherit"
                    startDecorator={renderSwatch('dark', token)}
                    sx={{
                      fontSize: 'xs',
                      fontFamily: 'code',
                      textAlign: 'left',
                      alignItems: 'flex-start',
                      cursor: 'copy',
                    }}
                    onClick={() => copy(dark[token])}
                  >
                    {dark[token]}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Box>
  );
}
