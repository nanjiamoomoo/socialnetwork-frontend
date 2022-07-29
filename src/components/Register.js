import React, {useState} from "react";
import {Form, Input, message, Button} from "antd";
import {UserOutlined, LockOutlined} from "@ant-design/icons";
import {BASE_URL} from "../constants";
import axios from "axios";
import {Link} from "react-router-dom";

function Register(props) {
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        const { username, password } = values;
        setLoading(true);
        const opt = {
            method: "POST",
            url: `${BASE_URL}/signup`,
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
                    message.success("Signup succeed!");
                    props.history.push('/login');
                }
            })
            .catch((err)=> {
                console.log("register failed: " + err.message)
                message.error("Register failed!")
            })
            .finally(()=> {
                setLoading(false);
            });
    }

    return (
        <Form
            name="signup_form"
            className="signup-form"
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input prefix={<UserOutlined/>} placeholder="username"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input.Password prefix={<LockOutlined/>} placeholder="Password"/>
            </Form.Item>

            <Form.Item
                name="confirm password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password prefix={<LockOutlined/>} placeholder="confirm password"/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="signup-form-button" loading={loading}>
                    Register
                </Button>
                <Link to="/login">Go to Login!</Link>
            </Form.Item>
        </Form>
    )
}

export default Register;

