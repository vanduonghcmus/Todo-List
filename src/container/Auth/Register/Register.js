import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { v4 } from "uuid";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import * as actions from "../../../store/action/index";
import notification from "../../../components/UI/Notification/Notification";

const Register = (props) => {
  const history = useHistory();

  const onFinish = (values) => {
    const idToken = v4();
    const newValue = { ...values, token: idToken };
    const checkUsername = props.users.find((result) => {
      return result.username === newValue.username;
    });
    if (checkUsername) {
      notification("error", "Username already exists!");
    } else {
      props.onSetAuth(newValue);
      setTimeout(() => {
        history.push("/taskList?id=" + localStorage.getItem("token"));
      }, 1000);
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
          { required: true, message: "username is required!" },
          { whitespace: true, message: "username cannot be empty!" },
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
      <Form.Item
        name="confirm"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password" },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Confirm Password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          block
          loading={props.loading}
        >
          SIGN UP
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
    onSetAuth: (user) => dispatch(actions.authUser(user)),
    onFetchUsers: () => dispatch(actions.fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
