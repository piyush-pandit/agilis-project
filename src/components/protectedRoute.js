import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthMiddleware } from '../middleware';

const ProtectedRoute = () => {
  useAuthMiddleware();

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;