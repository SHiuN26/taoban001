import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("auth", auth);

  return auth?.allRoles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth.allRoles.length === 0 ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace={true} />
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace={true} />
  );
};

export default RequireAuth;
