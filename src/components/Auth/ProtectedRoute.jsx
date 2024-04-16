import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAuthState } from "../../redux/Features/user_slice";

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useSelector(getAuthState);

  if (!loggedIn) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
