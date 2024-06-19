import React from 'react';
import { Typography, Paper, Box, useMediaQuery, useTheme } from '@mui/material';

const rightStyle = { display: 'flex', alignItems:'flex-end', flexDirection:'column' };

const Section = ({ title, name, price, quantity, bgcolor }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const renderProperty = (name, value, style = {}) => {
    return (
      <Box sx={{ width: '50%', p: 4, ...style }}>
        <Typography variant={'h7'} sx={{ fontWeight: '600', fontSize: isSmallScreen ? 12 : 14 }}>{value}</Typography>
        <Typography sx={{ fontWeight: '300', fontSize: isSmallScreen ? 10 : 12 }}>{name}</Typography>
      </Box>
    );
  };

  return (
    <Box>
      <Paper elevation={3}>
        <Box sx={{ bgcolor, p: 1 }}>
          <Typography variant={'h6'} sx={{ color: 'white', fontWeight: '600' }}>{title}: {name}</Typography>
        </Box>
        <Box sx={{ display: 'flex'}}>
          {renderProperty(`${title} Price`, price, { borderRight: '1px solid grey' })}
          {renderProperty(`${title} Quantity`, quantity, rightStyle)}
        </Box>
      </Paper>
    </Box>
  );
};

export default Section;
