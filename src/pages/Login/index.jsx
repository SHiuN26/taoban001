import React, { useContext } from "react";
import { useRef, useState, useEffect } from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import styled from "styled-components";
import { Form, Input, Checkbox, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Password from "antd/lib/input/Password";
import axios from "../../API/axios";
import AuthContext from "../../context/AuthProvider ";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const LOGIN_URL = "http://192.168.0.124:5000/api/Login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const mailRef = useRef();
  // const userRef = useRef();
  const errRef = useRef();

  // const [user, set_User] = useState("");
  // const [pwd, set_Pwd] = useState("");
  const [loginType, set_loginType] = useState("Email");
  const [email, set_Email] = useState("");
  const [phoneNumber, set_PhoneNumber] = useState("");
  const [hashPassword, set_HashPassword] = useState("");
  const [isPersistent, set_IsPersistent] = useState(true);

  const [errMsg, set_ErrMsg] = useState("");
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
          },
          // withCredentials: true,
        }
      );
      console.log("JSON.stringify(res.data)", res.data);
      const accessToken = res?.data?.accessToken;
      const roles = res?.data?.roles;
      setAuth({ email, hashPassword, roles, accessToken });
      set_Email("");
      set_HashPassword("");
      set_Success(true);
    } catch (err) {
      if (!err?.response) {
        set_ErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        set_ErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        set_ErrMsg("Unauthorized");
      } else {
        set_ErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  useEffect(() => {
    mailRef.current.focus();
  }, []);

  useEffect(() => {
    set_ErrMsg("");
  }, [email, hashPassword]);

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
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};
export default Login;
