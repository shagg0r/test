import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <FormGrid item xs={12} sm={6}>
          <FormLabel required>First name</FormLabel>
          <InputBase
            id="first-name"
            name="first-name"
            type="name"
            placeholder="John"
            autoComplete="first name"
            inputProps={{ required: true }}
            sx={{ minWidth: 280 }}
          />
        </FormGrid>
        <FormGrid item xs={12} sm={6}>
          <FormLabel required>Last name</FormLabel>
          <InputBase
            id="last-name"
            name="last-name"
            type="last-name"
            placeholder="Snow"
            autoComplete="last name"
            inputProps={{ required: true }}
            sx={{ minWidth: 280 }}
          />
        </FormGrid>
        <FormGrid item xs={12} sm={6}>
          <FormLabel required>Country</FormLabel>
          <InputBase
            id="country"
            name="country"
            type="country"
            placeholder="United States"
            autoComplete="shipping country"
            inputProps={{ required: true }}
            sx={{ minWidth: 280 }}
          />
        </FormGrid>
        <FormGrid item xs={12} sm={6}>
          <FormLabel required>Zip / Postal code</FormLabel>
          <InputBase
            id="zip"
            name="zip"
            type="zip"
            placeholder="12345"
            autoComplete="shipping postal-code"
            inputProps={{ required: true }}
            sx={{ minWidth: 280 }}
          />
        </FormGrid>

        <FormGrid item xs={12}>
          <FormLabel required>Address line 1</FormLabel>
          <InputBase
            id="address1"
            name="address1"
            type="address1"
            placeholder="Street name and number"
            autoComplete="shipping address-line1"
            inputProps={{ required: true }}
            sx={{ minWidth: 280 }}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel>Address line 2</FormLabel>
          <InputBase
            id="address2"
            name="address2"
            type="address2"
            placeholder="Apartment, suite, unit, etc. (optional)"
            autoComplete="shipping address-line2"
            inputProps={{ required: true }}
            sx={{ minWidth: 280 }}
          />
        </FormGrid>
        <FormGrid item xs={12} sm={6}>
          <FormLabel required>City</FormLabel>
          <InputBase
            id="City"
            name="City"
            type="City"
            placeholder="New York"
            autoComplete="City"
            inputProps={{ required: true }}
            sx={{ minWidth: 280 }}
          />
        </FormGrid>
        <FormGrid item xs={12} sm={6}>
          <FormLabel required>State</FormLabel>
          <InputBase
            id="State"
            name="State"
            type="State"
            placeholder="NY"
            autoComplete="State"
            inputProps={{ required: true }}
            sx={{ minWidth: 280 }}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </FormGrid>
      </Grid>
    </React.Fragment>
  );
}
