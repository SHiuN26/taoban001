import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log("auth", auth);
  }, [auth]);
  // return auth?.authRoles?.find((role) => allowedRoles?.includes(role)) ? (
  return auth?.authRoles ? (
    <Outlet />
  ) : auth.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
