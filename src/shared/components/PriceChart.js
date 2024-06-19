import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const PriceChart = ({ bids = [], asks = [] }) => {
  const formattedBids = bids.map((item, index) => ({
    time: index,
    price: item.price,
    size: item.size,
    type: 'bid'
  }));

  const formattedAsks = asks.map((item, index) => ({
    time: index,
    price: item.price,
    size: item.size,
    type: 'ask'
  }));

  const formattedData = [...formattedBids, ...formattedAsks];

  return (
    <LineChart width={1000} height={300} data={formattedData}>
      <XAxis dataKey="time" />
      <YAxis  dataKey="price"/>
      <Tooltip />
      <CartesianGrid stroke="#f5f5f5" />
      <Line type="bump" dataKey="price" stroke="#ff7300" yAxisId={0} name="Bid" />
      <Line type="bump" dataKey="price" stroke="#387908" yAxisId={0} name="Ask" />
    </LineChart>
  );
};

export default PriceChart;
