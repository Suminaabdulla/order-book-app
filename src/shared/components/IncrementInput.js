import React from 'react';
import { TextField, Typography, Grid } from '@mui/material';

const IncrementInput = ({ increment, setIncrement }) => {
  return (
    <Grid container spacing={2} sx={{pt:2, alignItems:'center'}}>
      <Grid item xs={2}>
        <Typography variant="body1" htmlFor="increment">
          Aggregation Increment:
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <TextField
          id="increment"
          type="number"
          step="0.01"
          value={increment}
          onChange={(e) => setIncrement(parseFloat(e.target.value))}
          variant="outlined"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default IncrementInput;
