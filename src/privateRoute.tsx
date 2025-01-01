import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return token !== null;
};

const PrivateRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
