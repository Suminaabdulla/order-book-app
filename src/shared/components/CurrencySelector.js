import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const CurrencySelector = ({ selectedPair, onSelectPair, currencies }) => {
  return (
    <FormControl sx={{ width: '20%' }}>
      <InputLabel>Currency</InputLabel>
      <Select
        value={selectedPair}
        onChange={(e) => onSelectPair(e.target.value)}
        placeholder="Select Currency"
        label="Currency"
      >
        {currencies.map((pair, idx) => (
          <MenuItem key={idx} value={pair.id}>{pair.display_name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelector;
