import { createContext, useState, useEffect } from "react";
import axios from "../API/axios";
import { useNavigate } from "react-router-dom";

const ROLE_URL = "/api/Role/GetRoles";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, set_Auth] = useState({});
  const [accessToken, set_AccessToken] = useState("");

  const navigate = useNavigate();

  const getToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken !== "") {
      set_AccessToken(accessToken);
      // console.log("accessToken === ", accessToken);
    }
  };

  const getRoles = async () => {
    const roles = await axios.get(ROLE_URL, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("roles", roles);
    if (roles.status === 200 && roles.data.length !== 0) {
      set_Auth(allRoles[roles.data]);
      console.log("auth", auth);
      // navigate("/home", { replace: true });
    }
  };

  useEffect(() => {
    getToken();
    if (accessToken !== "") {
      console.log("accessToken === ", accessToken);
      getRoles();
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ auth, set_Auth }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
