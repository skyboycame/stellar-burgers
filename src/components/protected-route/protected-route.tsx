import {
  selectisAuthChecked,
  selectIsAuthenticated
} from '@features/user/user-selectors';
import { useSelector } from '@store';
import { Preloader } from '@ui';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface props {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: props) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAuthChecked = useSelector(selectisAuthChecked);
  const location = useLocation();
  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return children;
};
