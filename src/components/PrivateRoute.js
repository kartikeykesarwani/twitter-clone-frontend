import React from 'react';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to='/auth' replace state={{ from: location }} />
  );
};

export default PrivateRoute;
