import FolderIcon from '@mui/icons-material/Folder';
import PropTypes from 'prop-types';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';

import Typography from '@mui/joy/Typography';
import * as React from 'react';

const CustomBreadcrumbs = ({ color }) => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [navigationItems, setNavigationItems] = React.useState([
    'Programs',
    'Files',
    'Services',
  ]);

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumbs">
      {collapsed ? (
        <Button
          size="sm"
          onClick={() => {
            setNavigationItems((prev) => ['Root', 'Home', ...prev]);
            setCollapsed(false);
          }}
          variant="plain"
          color={color}
        >
          •••
        </Button>
      ) : null}
      {navigationItems.map((item) => (
        <Link
          // The `preventDefault` is for demonstration purposes, generally, you don't need it in your application
          onClick={(event) => event.preventDefault()}
          underline="hover"
          color={color}
          href="/"
          fontSize="inherit"
        >
          <FolderIcon sx={{ mr: 0.5 }} fontSize="inherit" color="inherit" />
          {item}
        </Link>
      ))}

      <Typography fontSize="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
        <FolderIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        bablo.txt
      </Typography>
    </Breadcrumbs>
  );
};

CustomBreadcrumbs.propTypes = {
  color: PropTypes.oneOf([
    'danger',
    'info',
    'neutral',
    'primary',
    'success',
    'warning',
  ]).isRequired,
};

export default function CollapsedBreadcrumbs() {
  return (
    <Box
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {['neutral', 'primary', 'danger', 'info', 'success', 'warning'].map(
        (color) => (
          <Sheet variant="plain" color={color} key={color}>
            <CustomBreadcrumbs color={color} />
          </Sheet>
        ),
      )}
    </Box>
  );
}
