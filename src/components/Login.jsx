import React from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { username, password } = values;
    if (username === "admin" && password === "Test@123") {
      navigate("/app/configure");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Form
      name="login"
      onFinish={onFinish}
      style={{ maxWidth: "300px", margin: "100px auto" }}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
