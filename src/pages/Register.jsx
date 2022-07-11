import React from "react";
import { useRef, useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./Register.css";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

//正則表達式，若有其他需求可再去查找或修改成需要的格式
// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const MAIL_REGEX = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //此為通用信箱正則表達
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = "http://192.168.0.124:5000/api/Regist";

const Register = () => {
  const mailRef = useRef();
  const errRef = useRef();

  const [registType, setRegistType] = useState("Email");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [validMail, setValidMail] = useState(false);
  const [mailFocus, setMailFocus] = useState(false);

  const [hashPassword, setHashPassword] = useState("");
  const [validPwd, setValidHashPassword] = useState(false);
  const [pwdFocus, setHashPasswordFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        REGISTER_URL,
        JSON.stringify({ registType, email, hashPassword, phoneNumber }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            // withCredentials: true,
          },
          // withCredentials: true, //Access-Control-Allow-Origin": "*" 設定為星號時不支援帳號密碼，所以 withCredentials不能設定為true
        }
      );
      console.log("res", res?.data);
      console.log("accessToken", res?.accessToken);
      console.log("JSON.Stringify(res)", JSON.Stringify(res));
      setSuccess(true);
      setEmail("");
      setHashPassword("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.res) {
        message.error("No server response");
      } else if (err.res?.status === 409) {
        message.error("Mail Taken");
      } else {
        message.error("Registeration Failed");
      }
      errRef.current.focus();
    }
  };

  useEffect(() => {
    mailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = MAIL_REGEX.test(email);
    console.log("result", result);
    console.log("mail", email);
    setValidMail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(hashPassword);
    console.log("result", result);
    console.log("hashPassword", hashPassword);
    setValidHashPassword(result);
    const match = hashPassword === matchPwd;
    setValidMatch(match);
  }, [hashPassword, matchPwd]);

  useEffect(() => {
    message.error("");
  }, [email, hashPassword, matchPwd]);

  return (
    <Wrapper>
      <Form
        name="register-form"
        className="register-form"
        onFinish={handleSubmit}
      >
        <h1>Register</h1>
        <Form.Item
          name="mail"
          rules={[{ required: true }, { message: "mail is required!" }]}
        >
          <Input
            type="text"
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="email"
            ref={mailRef}
            autoComplete="off"
            onFocus={() => setMailFocus(true)}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "please input your password" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            onChange={(e) => setHashPassword(e.target.value)}
            onFocus={() => setHashPasswordFocus(true)}
            value={hashPassword}
          />
        </Form.Item>

        <Form.Item
          name="confirm-password"
          rules={[
            {
              required: true,
              message: "Must match the first password input field",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="confirm-password"
            onChange={(e) => setMatchPwd(e.target.value)}
            onFocus={() => setMailFocus(true)}
            value={matchPwd}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
          >
            Register Now
          </Button>
          <Link to="/Login">Or Log in </Link>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default Register;
