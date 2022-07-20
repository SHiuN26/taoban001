import { createContext, useState, useEffect } from "react";
import axios from "../API/axios";
import { useNavigate } from "react-router-dom";

const ROLE_URL = "/api/Role/GetRoles";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, set_Auth] = useState({});
  const [accessToken, set_AccessToken] = useState("");
  const navigate = useNavigate();

  //取token
  const getToken = () => {
    const token = localStorage.getItem("accessToken"); //先確認是不是有token
    if (token === null) {
      console.log("token is null");
      navigate("/Login"); //如果沒有，踢去登錄頁
      return;
    } else {
      console.log("accessToken", accessToken);
      set_AccessToken(token); //如果有，setToken
    }
  };

  //取角色
  const getRoles = async () => {
    try {
      const roles = await axios
        .get(ROLE_URL, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`, //token塞進header發請求拿角色
          },
        })
        .then(function (response) {
          console.log(response.data);
          set_Auth({ ...auth, accessToken: response.data });
          console.log("roles", roles);
          console.log("auth", auth);
        });
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          //401代表token過期
          console.log("err.response.status", err.response.status);
          navigate("/Login");
          return;
        }
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    getRoles();
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ auth, set_Auth, accessToken, set_AccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
