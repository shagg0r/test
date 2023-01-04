import * as React from 'react';
import { styled, extendTheme } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import LightMode from '@mui/icons-material/LightModeOutlined';
import DarkMode from '@mui/icons-material/DarkModeOutlined';

const Table = styled('table')(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.vars.palette.divider,
  borderRadius: theme.vars.radius.xs,
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 20,
  thead: {
    height: 32,
  },
  th: {
    textAlign: 'left',
  },
  td: {
    verticalAlign: 'top',
  },
}));
const defaultTheme = extendTheme();

export default function ShadowThemeViewer() {
  const tokens = Object.keys(defaultTheme.shadow);
  const formatShadowLayers = (shadow) =>
    React.Children.toArray(
      shadow
        .split(', ')
        .reduce(
          (result, curr, index, array) =>
            array.length - 1 !== index
              ? [...result, `${curr},`, <br />]
              : [...result, curr],
          [],
        ),
    );

  return (
    <Table>
      <thead>
        <tr>
          <th>
            <Typography fontSize="sm">Token</Typography>
          </th>
          <th>
            <Typography fontSize="sm">Value</Typography>
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
        {tokens.map((token) => (
          <tr key={token}>
            <td>
              <Typography fontSize="sm">{token}</Typography>
            </td>
            <td>
              <Typography level="body2">
                {formatShadowLayers(defaultTheme.shadow[token])}
              </Typography>
            </td>
            <td data-joy-color-scheme="light">
              <Sheet
                variant="outlined"
                sx={{
                  width: 64,
                  height: 64,
                  boxShadow: (theme) => theme.shadow[token],
                  borderRadius: 'xs',
                  mr: 2,
                }}
              />
            </td>
            <td data-joy-color-scheme="dark">
              <Sheet
                variant="outlined"
                sx={{
                  width: 64,
                  height: 64,
                  boxShadow: (theme) => theme.shadow[token],
                  borderRadius: 'xs',
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
