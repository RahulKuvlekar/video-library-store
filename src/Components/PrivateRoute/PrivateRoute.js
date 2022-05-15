import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../../Hooks/useAuthContext";

const PrivateRoute = ({ children }) => {
  const { authState } = useAuthContext();
  const { isAuthenticated } = authState;
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
