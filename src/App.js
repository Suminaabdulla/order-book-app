import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, Box, ThemeProvider } from '@mui/material';
import SideMenu from './shared/components/SideMenu';
import AppRoutes from './routes/appRoutes';
import Header from './shared/header/Header';
import Footer from './shared/footer/footer';
import theme from './utils/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <SideMenu />
          <Box component="main" sx={{ flexGrow: 1, p: 2, mt: 10 }}>
            <AppRoutes />
          </Box>
        </Box>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
