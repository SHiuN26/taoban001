import { createContext, useState, useEffect } from "react";
import axios from "../API/axios";
import { useNavigate } from "react-router-dom";

const ROLE_URL = "/api/Role/GetRoles";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, set_Auth] = useState({});
  const [accessToken, set_AccessToken] = useState("");

  const getToken = () => {
    const token = localStorage.getItem("accessToken");
    console.log("token", token);
    if (token === null) {
      console.log("token is null");
      return;
    } else {
      set_AccessToken(token);
      localStorage.setItem("accessToken", accessToken);
      console.log("accessToken", accessToken);
      getRoles();
    }
  };

  const getRoles = async () => {
    console.log("accessToken", accessToken);
    try {
      const roles = await axios
        .get(ROLE_URL, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(function (response) {
          console.log(response.data);
          console.log("roles", roles);
        });
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          console.log("err.response.status", err.response.status);
          // localStorage.removeItem("accessToken");
        }
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, set_Auth, accessToken, set_AccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
