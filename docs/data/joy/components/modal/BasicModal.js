import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="solid"
          sx={{
            maxWidth: 400,
            borderRadius: 'sm',
            p: 2,
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant="soft"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
            }}
          />
          <Typography component="h2" id="modal-title" level="h4" textColor="inherit">
            Modal title
          </Typography>
          <Typography id="modal-desc" textColor="inherit">
            It is recommended to use `aria-labelledby` on the modal dialog with an
            optional `aria-describedby` attribute.
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
