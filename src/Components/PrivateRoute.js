import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, isLoggedIn, ...rest }) => {
  return isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
