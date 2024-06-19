import React from 'react';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import CustomTable from '../../../core/components/CustomTable';

const LadderView = ({ bids, asks, increment }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const aggregateOrders = (orders) => {
    const aggregated = {};
    orders.forEach((order) => {
      const price = parseFloat(order.price);
      const size = parseFloat(order.size);
      const aggregatedPrice = Math.floor(price / increment) * increment;
      if (aggregated[aggregatedPrice]) {
        aggregated[aggregatedPrice] += size;
      } else {
        aggregated[aggregatedPrice] = size;
      }
    });
    return aggregated;
  };

  const aggregatedBids = aggregateOrders(bids);
  const aggregatedAsks = aggregateOrders(asks);

  const bidsData = Object.keys(aggregatedBids).map((price) => [price, aggregatedBids[price]]);
  const asksData = Object.keys(aggregatedAsks).map((price) => [price, aggregatedAsks[price]]);

  const bidsHeaders = ['Price', 'Size'];
  const asksHeaders = ['Price', 'Size'];

  return (
    <Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{width: isSmallScreen? ' 100%':'40%'}}>
          <h3>Bids</h3>
          <CustomTable data={bidsData} headers={bidsHeaders} />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
      <Box sx={{width: isSmallScreen? ' 100%':'40%'}}>
          <h3>Asks</h3>
          <CustomTable data={asksData} headers={asksHeaders} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LadderView;
