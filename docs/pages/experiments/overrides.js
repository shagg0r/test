import * as React from 'react';
import { styled } from '@mui/material/styles';

const A = styled('div')({
  minWidth: 300,
  minHeight: 100,
  padding: 10,
  margin: 10,
  background: 'orange',
  color: 'white',
  variants: [{
    props: { variant: 'primary' },
    style: {
      background: 'blue',
    },
  }]
});

const B = styled(A)({
  background: 'red',
  variants: [{
    props: { variant: 'secondary' },
    style: {
      background: 'purple',
    },
  }]
})

export default function Overrides() {
  return (
    <>
      <A>This is orange</A>
      <A variant="primary">This is blue</A>
      <B>This is red</B>
      <B variant="primary">This is red</B>
      <B variant="secondary">This is purple</B>
    </>
  )
}