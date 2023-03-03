import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';

export default function LayoutModalDialog() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [layout, setLayout] = React.useState<ModalDialogProps['layout'] | undefined>(
    undefined,
  );
  return (
    <React.Fragment>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            setOpen(true);
            setLayout('center');
          }}
        >
          Center
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            setOpen(true);
            setLayout('fullscreen');
          }}
        >
          Full screen
        </Button>
      </Stack>
      <Modal open={!!open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="layout-modal-title"
          aria-describedby="layout-modal-description"
          layout={layout}
        >
          <ModalClose />
          <Typography id="layout-modal-title" component="h2">
            Modal Dialog
          </Typography>
          <Typography id="layout-modal-description" textColor="text.tertiary">
            This is a <code>{layout}</code> modal dialog. Press <code>esc</code> to
            close it.
          </Typography>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
