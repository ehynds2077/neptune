import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Navigate } from "react-router";
import { selectUser } from "../features/auth/authSlice";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
