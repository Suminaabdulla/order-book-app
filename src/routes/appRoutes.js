import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import { DASHBOARD_PATH } from './routePaths';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={DASHBOARD_PATH} element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
