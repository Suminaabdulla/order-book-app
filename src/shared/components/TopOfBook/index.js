import React from 'react';
import { Grid } from '@mui/material';
import Section from './Section';

const TopOfBook = ({ bestBid, bestAsk }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Section
          title="Bid"
          name={bestBid?.name || 'N/A'}
          price={bestBid ? bestBid.price : null}
          quantity={bestBid ? bestBid.size : null}
          bgcolor={'lightBlue'}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Section
          title="Ask"
          name={bestAsk?.name || 'N/A'}
          price={bestAsk ? bestAsk.price : null}
          quantity={bestAsk ? bestAsk.size : null}
          bgcolor={'orange'}
        />
      </Grid>
    </Grid>
  );
};

export default TopOfBook;
