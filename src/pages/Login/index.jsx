import React from "react";
import 'antd/dist/antd.min.css';
import './index.css';
import styled from "styled-components";
import { Form, Input, Checkbox, Button } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const CustomForm = styled.form`
    /* display:flex;
    justify-content: center;
    align-items: center; */
    /* width:400px;
    height:400px; */
    
`

const Login = () => {
    return (
        <>
            <CustomForm
                name="login-form"
                className="login-form"
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true },
                    { message: "please input your username!" }
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
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
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
            </CustomForm >
        </>
    );
};
export default Login;