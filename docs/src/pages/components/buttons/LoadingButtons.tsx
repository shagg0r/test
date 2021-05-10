import * as React from 'react';
import LoadingButton from '@material-ui/lab/LoadingButton';
import SaveIcon from '@material-ui/icons/Save';
import Stack from '@material-ui/core/Stack';

export default function LoadingButtons() {
  return (
    <Stack spacing={1}>
      <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton>
      <LoadingButton loading loadingIndicator="Loading..." variant="outlined">
        Fetch data
      </LoadingButton>
      <LoadingButton
        loading
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
      >
        Save
      </LoadingButton>
    </Stack>
  );
}
