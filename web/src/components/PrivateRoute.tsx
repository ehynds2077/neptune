import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { selectUser } from "../features/auth/authSlice";

export const PrivateRoute = () => {
  const location = useLocation();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  });

  return (
    <>
      <Outlet />
    </>
  );
};
