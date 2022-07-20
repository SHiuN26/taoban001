import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider .js";

const RequireAuth = ({ allowedRoles }) => {
  const { auth, set_Auth, accessToken, set_AccessToken } = useAuth(AuthContext);

  const location = useLocation();
  console.log("auth", auth);

  return auth?.allRoles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.allRoles ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace={true} />
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace={true} />
  );
};

export default RequireAuth;
