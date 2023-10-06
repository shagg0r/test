import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Snackbar, { SnackbarOrigin } from '@mui/joy/Snackbar';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function SnackbarVariants() {
  const [open, setOpen] = React.useState(false);
  const [reasons, setReasons] = React.useState([]);
  console.log('reasons', reasons);
  React.useEffect(() => {
    if (
      ['timeout', 'clickaway', 'escapeKeyDown'].every((item) =>
        reasons.includes(item),
      )
    ) {
      setOpen(false);
    }
  }, [reasons]);
  return (
    <div>
      <Button
        variant="outlined"
        color="neutral"
        onClick={() => {
          setOpen(true);
        }}
      >
        Show snackbar
      </Button>
      <Snackbar
        autoHideDuration={3000}
        open={open}
        onClose={(event, reason) => {
          setReasons((prev) => [...new Set([...prev, reason])]);
        }}
        onUnmount={() => {
          setReasons([]);
        }}
        sx={{ minWidth: 360 }}
      >
        <Stack spacing={0.5}>
          <Typography level="title-md">
            To close this snackbar, you have to:
          </Typography>
          <List size="sm">
            <ListItem>
              {reasons.includes('timeout') ? (
                <CheckBoxIcon color="success" />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}{' '}
              Wait for 3 seconds.
            </ListItem>
            <ListItem>
              {reasons.includes('clickaway') ? (
                <CheckBoxIcon color="success" />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}{' '}
              Click outside of the snackbar.
            </ListItem>
            <ListItem>
              {reasons.includes('escapeKeyDown') ? (
                <CheckBoxIcon color="success" />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}{' '}
              Press ESC key.
            </ListItem>
          </List>
        </Stack>
      </Snackbar>
    </div>
  );
}
