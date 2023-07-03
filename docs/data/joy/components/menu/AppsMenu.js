import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import MenuButton from '@mui/joy/MenuButton';
import Apps from '@mui/icons-material/Apps';
import Dropdown from '@mui/joy/Dropdown';

export default function AppsMenu() {
  return (
    <Box>
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          id="apps-menu-demo"
          variant="plain"
          color="neutral"
          sx={{ borderRadius: 40 }}
        >
          <Apps />
        </MenuButton>
        <Menu
          id="apps-menu"
          variant="solid"
          invertedColors
          aria-labelledby="apps-menu-demo"
          sx={{
            '--List-padding': '0.5rem',
            '--ListItemDecorator-size': '3rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 100px)',
            gridAutoRows: '100px',
            gap: 1,
          }}
        >
          <MenuItem orientation="vertical">
            <ListItemDecorator>
              <Avatar>S</Avatar>
            </ListItemDecorator>
            Search
          </MenuItem>
          <MenuItem orientation="vertical">
            <ListItemDecorator>
              <Avatar>M</Avatar>
            </ListItemDecorator>
            Maps
          </MenuItem>
          <MenuItem orientation="vertical">
            <ListItemDecorator>
              <Avatar>M</Avatar>
            </ListItemDecorator>
            Mail
          </MenuItem>
          <MenuItem orientation="vertical">
            <ListItemDecorator>
              <Avatar>D</Avatar>
            </ListItemDecorator>
            Drive
          </MenuItem>
          <MenuItem orientation="vertical">
            <ListItemDecorator>
              <Avatar>C</Avatar>
            </ListItemDecorator>
            Calendar
          </MenuItem>
        </Menu>
      </Dropdown>
    </Box>
  );
}
