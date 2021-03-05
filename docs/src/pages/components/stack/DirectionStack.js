import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Stack from '@material-ui/core/Stack';

export default function DirectionStack() {
  return (
    <Stack direction="row" spacing={2}>
      {[0, 1, 2].map((value) => (
        <Paper
          key={value}
          sx={(theme) => ({
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
          })}
        >
          {`Cell ${value + 1}`}
        </Paper>
      ))}
    </Stack>
  );
}
