import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Checkbox, Button, message } from "antd";
import useAuth from "../hooks/useAuth.jsx";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "../API/axios";

import styled from "styled-components";
import "./Login.css";
import "antd/dist/antd.min.css";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const LOGIN_URL = "/api/Login";
const ROLE_URL = "/api/Role/GetRoles";

const Login = () => {
  const { auth, set_Auth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const mailRef = useRef();

  const [loginType, set_loginType] = useState("Email");
  const [email, set_Email] = useState("");
  const [phoneNumber, set_PhoneNumber] = useState("");
  const [hashPassword, set_HashPassword] = useState("");
  const [isPersistent, set_IsPersistent] = useState(true);
  const [allRoles, set_All_Roles] = useState([]);

  const [success, set_Success] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          loginType,
          email,
          hashPassword,
          phoneNumber,
          isPersistent,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            // withCredentials: true,
          },
        }
      );

      if (res.data.isSuccess) {
        message.success("登入成功");
        console.log("res === ", res);
        const roles = await axios.get(ROLE_URL, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${res?.data?.token}`,
          },
        });
        const accessToken = res?.data?.token;

        console.log("roles === ", roles);
        set_All_Roles(roles.data);
        set_Auth({ email, hashPassword, accessToken, allRoles: roles.data });
        set_Email("");
        set_HashPassword("");
        set_Success(true);
        localStorage.setItem("accessToken", accessToken);
        navigate(from, { replace: true });
      } else {
        message.error("登入失敗，請確認帳號密碼!!");
      }
    } catch (err) {
      if (!err?.response) {
        // console.log("err.response", err.response);
        // message.error("伺服器無回應");
      } else if (err.response?.status === 400) {
        message.error("遺失帳號或密碼");
      } else if (err.response?.status === 401) {
        message.error("帳號無相關權限");
      } else {
        message.error("登入失敗");
      }
      // errRef.current.focus();
    }
  };

  console.log("allRoles === ", allRoles);
  console.log("auth", auth);

  useEffect(() => {
    mailRef.current.focus();
  }, []);

  return (
    <Wrapper>
      <Form name="login-form" className="login-form" onFinish={handleSubmit}>
        <h1>Login</h1>
        <Form.Item
          name="username"
          rules={[
            { required: true },
            { message: "please input your username!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            ref={mailRef}
            autoComplete="off"
            onChange={(e) => set_Email(e.target.value)}
            value={email}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            onChange={(e) => set_HashPassword(e.target.value)}
            value={hashPassword}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/Register">Sign up</Link>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};
export default Login;
