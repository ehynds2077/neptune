import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";

export const PublicRoute = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigate("/app/inbox", { replace: true });
    }
  }, [user, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};
