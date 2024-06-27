import React from 'react';
import { Box, List, ListItem, ListItemText, Divider, useTheme } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { DASHBOARD_PATH } from '../../routes/routePaths';

const drawerWidth = 240;

const SideMenu = () => {
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: 0,
        width: drawerWidth,
        bgcolor: 'orange',
        color: 'white',
        overflowY: 'auto',
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        mt: 8,
        display: isSmallScreen ? 'none' : 'block'
      }}
    >
      <List>
        <ListItem
          button
          component={RouterLink}
          to="/dashboard"
          selected={location.pathname === DASHBOARD_PATH}
        >
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
};

export default SideMenu;
