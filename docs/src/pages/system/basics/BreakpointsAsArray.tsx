import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function BreakpointsAsArray() {
  return (
    <div>
      <Box sx={{ width: [100, 200, 300] }}>
        This box has a responsive width.
      </Box>
    </div>
  );
}
