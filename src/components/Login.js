import React, {useState} from "react";
import axios from "axios";
import {Form, Input, Button, message} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {BASE_URL} from "../constants";
import {Link} from "react-router-dom";



//login function
function Login(props) {
    const { handleLoggedIn } = props;
    const[loading, setLoading] = useState(false);

    const onFinish = (values) => {
        //deconstruct the values to get the form input username and password
        const { username, password } = values;
        setLoading(true);
        const opt = {
            method: "POST",
            url: `${BASE_URL}/signin`,
            data: {
                username: username,
                password: password
            },
            headers: {
                "Content-Type": "application/json"
            }
        };
        axios(opt)
            .then((response) => {
                if (response.status === 200) {
                    const {data} = response;
                    handleLoggedIn(data);
                    message.success("Login succeed!")
                }
            })
            .catch((err)=> {
                console.log("login failed: " + err.message)
                message.error("Login failed!")
            })
            .finally(()=> {
                setLoading(false);
            });
    }

    return (
        <Form
            name="login_form"
            className="login-form"
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input prefix = {<UserOutlined />} placeholder="Username"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password prefix = {<LockOutlined />} placeholder="Password"/>
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                    Login
                </Button>
                Or <Link to="/register">register now!</Link>
            </Form.Item>
        </Form>
    );
}

export default Login;