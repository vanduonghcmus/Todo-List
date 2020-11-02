import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import * as actions from "../../../store/action/index";
import notification from "../../../components/UI/Notification/Notification";

const Login = (props) => {
  const { onFetchUsers, users, loading } = props;
  useEffect(() => {
    onFetchUsers();
  }, [onFetchUsers]);

  const history = useHistory();
  const onFinish = (values) => {
    const currentUsers = users.find((result) => {
      return (
        result.username === values.username &&
        result.password === values.password
      );
    });
    if (currentUsers) {
      localStorage.setItem("userId", currentUsers.id);
      localStorage.setItem("token", currentUsers.token);
      setTimeout(() => {
        history.push("/taskList?id=" + localStorage.getItem("token"));
      }, 1000);
    } else {
      notification("error", "Username or Password is not correct");
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      size="large"
      onFinish={onFinish}
      initialValues={{ remember: false }}
    >
      <Form.Item
        name="username"
        rules={[
          { required: true, message: "username is required" },
          { whitespace: false, message: "username cannot be empty!" },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "password is required" },
          { whitespace: false, message: "username cannot be empty!" },
          { min: 6, message: "password at least 6 characters! " },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox style={{ fontSize: "16px" }}>Remember me</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          block
          loading={loading}
        >
          SIGN IN
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.auth.users,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUsers: () => dispatch(actions.fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
