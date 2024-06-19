import React from 'react';
import { Select, MenuItem } from '@mui/material';

const CurrencySelector = ({ selectedPair, onSelectPair, currencies }) => {
  return (
    <Select value={selectedPair} onChange={(e) => onSelectPair(e.target.value)} sx={{width:'20%'}} variant='standard'>
      {currencies.map((pair, idx) => (
        <MenuItem key={idx} value={pair.id}>{pair.display_name}</MenuItem>
      ))}
    </Select>
  );
};

export default CurrencySelector;
