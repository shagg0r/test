import * as React from 'react';
import Grid from '@material-ui/core/Grid';

const References = () => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ textAlign: 'center', '& img': { maxWidth: '100%' } }}
    >
      <Grid item xs={4} md={2}>
        <img src="/static/icons/coursera.svg" alt="Coursera logo" />
      </Grid>
      <Grid item xs={4} md={2}>
        <img src="/static/icons/amazon.svg" alt="Amazon logo" />
      </Grid>
      <Grid item xs={4} md={2}>
        <img src="/static/icons/nasa.svg" alt="Nasa logo" />
      </Grid>
      <Grid item xs={4} md={2}>
        <img src="/static/icons/netflix.svg" alt="Netflix logo" />
      </Grid>
      <Grid item xs={4} md={2}>
        <img src="/static/icons/unity.svg" alt="Unity logo" />
      </Grid>
      <Grid item xs={4} md={2}>
        <img src="/static/icons/shutterstock.svg" alt="Shutterstock logo" />
      </Grid>
    </Grid>
  );
};

export default References;
