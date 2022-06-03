import React from "react";
import { useLocation } from "react-router";
import { Navigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
