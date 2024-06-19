import React, { useState } from 'react';
import {  Box, Typography } from '@mui/material';
import useWebSocket from '../../hooks/useWebSocket';
import CurrencySelector from '../../shared/components/CurrencySelector';
import TopOfBook from '../../shared/components/TopOfBook';
import PriceChart from '../../shared/components/PriceChart';
import IncrementInput from '../../shared/components/IncrementInput';
import LadderView from '../../shared/components/ladderView';
import './dashboard.css';


const Dashboard = () => {
  const { currencies, pair, price, pastData, handleSelect,bestBid, bestAsk, orderBook} = useWebSocket();
const [increment, setIncrement] = useState(0.01);

  return (
    <div className="container">
      <Box sx={{ justifyContent:'flex-end', display:'flex', pb:1 }}>
        <CurrencySelector selectedPair={pair} onSelectPair={handleSelect} currencies={currencies} />
      </Box>
      <Typography gutterBottom variant='h5'sx={{ color:'grey', pb:1 }}>Price: {price}</Typography>
      <TopOfBook bestBid={bestBid} bestAsk={bestAsk} />
      <PriceChart bids={orderBook.bids} asks={orderBook.asks} />
      <IncrementInput increment={increment} setIncrement={setIncrement}/>
      <LadderView bids={orderBook.bids} asks={orderBook.asks} increment={increment} />
    </div>
  );
};

export default Dashboard;
