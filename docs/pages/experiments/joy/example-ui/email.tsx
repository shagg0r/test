import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { CssVarsProvider, Theme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import InboxIcon from '@mui/icons-material/Inbox';

export default function EmailExample() {
  return (
    <CssVarsProvider>
      <GlobalStyles<Theme>
        styles={(theme) => ({
          body: {
            margin: 0,
            fontFamily: theme.vars.fontFamily.body,
          },
        })}
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '0px 0px 1fr',
            sm: '64px minmax(200px, 1fr) minmax(500px, 1fr)',
            md: 'minmax(160px, 260px) minmax(200px, 480px) minmax(700px, 1fr)',
          },
          gridTemplateRows: '64px 1fr',
          minHeight: '100vh',
        }}
      >
        <Box
          className="Header"
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gridColumn: '1 / -1',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          Header
        </Box>
        <Box
          className="Navigation"
          sx={{
            borderRight: '1px solid',
            borderColor: 'divider',
            p: 2,
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              color="neutral.500"
              fontWeight={700}
              sx={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.1rem' }}
            >
              Browse
            </Typography>
          </Box>

          <List
            sx={{
              '--List-item-radius': '8px',
              '--List-decorator-width': '32px',
              '& .MuiListItemButton-root': { p: '8px' },
            }}
          >
            <ListItem>
              <ListItemButton variant="soft" color="primary">
                <ListItemDecorator sx={{ color: 'inherit' }}>
                  <InboxIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Inbox</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemDecorator sx={{ color: 'inherit' }}>
                  <InboxIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Inbox</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemDecorator sx={{ color: 'inherit' }}>
                  <InboxIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Inbox</ListItemContent>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Box
          className="Inbox"
          sx={{
            borderRight: '1px solid',
            borderColor: 'divider',
            p: 2,
          }}
        >
          Inbox
        </Box>
        <Box component="main" className="Main" sx={{ p: 2, bgcolor: 'background.level1' }}>
          <Sheet variant="outlined" sx={{ minHeight: 500, borderRadius: 'sm' }} />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
