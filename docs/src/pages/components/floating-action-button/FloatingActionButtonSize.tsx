import * as React from 'react';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavigationIcon from '@material-ui/icons/Navigation';

export default function FloatingActionButtonSize() {
  return (
    <Box
      sx={{
        '& button': { m: 1 },
      }}
    >
      <div>
        <Fab size="small" color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
        <Fab size="medium" color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
        <Fab color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
      <Box>
        <Fab variant="extended" size="small" color="primary" aria-label="add">
          <NavigationIcon />
          Extended
        </Fab>
        <Fab variant="extended" size="medium" color="primary" aria-label="add">
          <NavigationIcon />
          Extended
        </Fab>
        <Fab variant="extended" color="primary" aria-label="add">
          <NavigationIcon />
          Extended
        </Fab>
      </Box>
    </Box>
  );
}
