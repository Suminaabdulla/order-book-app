import React, { useState } from 'react';
import {  Box } from '@mui/material';
import useWebSocket from '../../hooks/useWebSocket';
import CurrencySelector from '../../shared/components/CurrencySelector';
import TopOfBook from '../../shared/components/TopOfBook';
import PriceChart from '../../shared/components/PriceChart';
import IncrementInput from '../../shared/components/IncrementInput';
import LadderView from '../../shared/components/ladderView';
import './dashboard.css';


const Dashboard = () => {
  const { currencies, pair, pastData, handleSelect,bestBid, bestAsk, orderBook} = useWebSocket();
  const [increment, setIncrement] = useState(0.01);

  const formatDataForChart = (data) => {
    return data.map((entry) => ({
      time: new Date(entry[0] * 1000).toLocaleDateString(),
      bid: entry[3], 
      ask: entry[2],
    }));
  };

  return (
    <div className="container">
      <Box sx={{ justifyContent:'flex-end', display:'flex', pb:1 }}>
        <CurrencySelector selectedPair={pair} onSelectPair={handleSelect} currencies={currencies} />
      </Box>
      <TopOfBook bestBid={bestBid} bestAsk={bestAsk} />
      {Boolean(formatDataForChart(pastData)?.length) && <PriceChart data={formatDataForChart(pastData)} /> }
      <IncrementInput increment={increment} setIncrement={setIncrement}/>
      <LadderView bids={orderBook.bids} asks={orderBook.asks} increment={increment} />
    </div>
  );
};

export default Dashboard;
