import React from "react";
import { useRef, useState, useEffect } from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import styled from "styled-components";
import { Form, Input, Checkbox, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Password from "antd/lib/input/Password";
import axios from "../../API/axios";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, set_User] = useState("");
  const [pwd, set_Pwd] = useState("");
  const [errMsg, set_ErrMsg] = useState("");
  const [success, set_Success] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(JSON.stringify({ user, pwd }), {
        headers: { "Ccontent-Type": "application/json" },
        withCredentials: true,
      });
      console.log("JSON.stringify(res.data)", JSON.stringify(res.data));
      set_User("");
      set_Pwd("");
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
    userRef.current.focus();
  }, []);

  useEffect(() => {
    set_ErrMsg("");
  }, [user, pwd]);

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
            ref={userRef}
            autoComplete="off"
            onChange={(e) => set_User(e.target.value)}
            value={user}
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
            onChange={(e) => set_Pwd(e.target.value)}
            value={pwd}
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
