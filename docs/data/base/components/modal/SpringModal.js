import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Modal } from '@mui/base/Modal';
import { Button } from '@mui/base/Button';
import { useSpring, animated } from '@react-spring/web';

export default function SpringModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <TriggerButton onClick={handleOpen}>Open modal</TriggerButton>
      <StyledModal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={open}>
          <ModalContent sx={style}>
            <h3 id="spring-modal-title" className="modal-title">
              Text in a modal
            </h3>
            <span id="spring-modal-description" className="modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </span>
          </ModalContent>
        </Fade>
      </StyledModal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return <Fade ref={ref} in={open} {...other} />;
});

Backdrop.propTypes = {
  open: PropTypes.bool.isRequired,
};

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const blue = {
  500: '#007FFF',
  600: '#0072E6',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const style = (theme) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
});

const ModalContent = styled('div')(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#FFF'};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 4px 12px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.20)'
  };
  padding: 1rem;
  color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;


  & .modal-title {
    margin: 0;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .modal-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
  }
  `,
);

const TriggerButton = styled(Button)`
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &:focus-visible {
    box-shadow: 0 3px 20px 0 rgb(61 71 82 / 0.1), 0 0 0 5px rgb(0 127 255 / 0.5);
    outline: none;
  }
`;
