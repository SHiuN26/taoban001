import React from "react";
import { useRef, useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import styled from "styled-components";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const Register = () => {
  const mailRef = useRef();
  const errRef = useRef();

  const [mail, setMail] = useState("");
  const [validMail, setValidMail] = useState(false);
  const [mailFocus, setMailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    mailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = MAIL_REGEX.test(mail);
    console.log("result", result);
    console.log("mail", mail);
    setValidMail(result);
  }, [mail]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log("result", result);
    console.log("pwd", pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [mail, pwd, matchPwd]);

  return (
    <Wrapper>
      <Form name="register-form" className="register-form">
        <h1>Register</h1>
        <Form.Item
          name="mail"
          rules={[{ required: true }, { message: "mail is required!" }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="email"
            ref={mailRef}
            autoComplete="off"
            onChange={(e) => setMail(e.target.value)}
            value={mail}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "please input your password" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
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
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default Register;
