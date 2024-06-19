import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { StyledBox } from './StyledComponent';
import AppIcon from '../../core/svg/AppIcon';

const Footer = () => {
  return (
    <StyledBox component="footer">
       <AppIcon width={'50'} height={'30'}/> 
      <Box sx={{ flexGrow: 1, marginLeft: '1rem' }}>
        <Typography variant="body2" sx={{ fontSize: 10 }}>
          Copyright stc &copy; {new Date().getFullYear()} All rights reserved
        </Typography>
      </Box>
      <Box sx={{ fontSize: 10 }}>
        <Link href="/privacy-policy" sx={{ color: 'white', marginRight: '1rem' }}>
          Important Documents
        </Link>
        <Link href="/privacy-policy" sx={{ color: 'white', marginRight: '1rem' }}>
          Privacy Policy
        </Link>
        <Link href="/terms-and-conditions" sx={{ color: 'white' }}>
          Terms and Conditions
        </Link>
      </Box>
    </StyledBox>
  );
};

export default Footer;
