import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ ...props }) => {
  return <Route {...props} />;
};

export default PublicRoute;
