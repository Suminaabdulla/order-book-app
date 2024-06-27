// PriceChart.js

import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const PriceChart = ({ data }) => {

  return (
    <div>
      <h2>Price Chart</h2>
      <LineChart width={1100} height={350} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="bid" stroke="#8884d8" name="Bid Price" />
        <Line type="monotone" dataKey="ask" stroke="#82ca9d" name="Ask Price" />   
      </LineChart>
    </div>
  );
};

export default PriceChart;
