import * as React from 'react';
import useNumberInput, { UseNumberInputParameters } from '@mui/base/useNumberInput';
import { styled } from '@mui/system';
import { unstable_useForkRef as useForkRef } from '@mui/utils';

const CustomNumberInput = React.forwardRef(function CustomNumberInput(
  props: UseNumberInputParameters & React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    getRootProps,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    focused,
  } = useNumberInput(props);

  const inputProps = getInputProps();

  // Make sure that both the forwarded ref and the ref returned from the getInputProps are applied on the input element
  inputProps.ref = useForkRef(inputProps.ref, ref);

  return (
    <StyledInputRoot {...getRootProps()} className={focused ? 'focused' : null}>
      <StyledStepperButton className="increment" {...getIncrementButtonProps()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
            fill="currentColor"
          />
        </svg>
      </StyledStepperButton>
      <StyledStepperButton className="decrement" {...getDecrementButtonProps()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
            fill="currentColor"
          />
        </svg>
      </StyledStepperButton>
      <StyledInputElement {...inputProps} />
    </StyledInputRoot>
  );
});

export default function UseNumberInput() {
  return (
    <CustomNumberInput aria-label="Demo number input" placeholder="Type a number…" />
  );
}

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledInputRoot: React.ElementType = styled('div')(
  ({ theme }) => `
    width: 320px;

    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;

    display: grid;
    grid-template-columns: 24px 1fr;
    grid-template-rows: 1fr 1fr;
    column-gap: 8px;
    padding: 6px;

    border-radius: 6px;
    border-style: solid;
    border-width: 1px;

    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &.focused {
      border-color: ${blue[400]};
      box-shadow:
        inset 0 0 0 1px ${blue[400]},
        0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

      & button:hover {
        background: ${blue[400]};
      }
    }
  `,
);

const StyledInputElement = styled('input')`
  grid-column: 2/3;
  grid-row: 1/3;
  background: none;
  border: 0;
  outline: 0;
  padding: 0;
`;

const StyledStepperButton = styled('button')`
  width: 1.5rem;
  height: 1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  box-sizing: border-box;
  border: 0;
  color: inherit;

  &:hover {
    cursor: pointer;
    background: ${blue[400]};
    color: ${grey[50]};
  }

  &.increment {
    grid-column: 1/2;
    grid-row: 1/2;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &.decrement {
    grid-column: 1/2;
    grid-row: 2/3;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;
