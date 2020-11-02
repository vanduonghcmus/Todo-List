import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "antd";

import classes from "./Auth.module.css";
import * as actions from "../../store/action/index";
import Register from "./Register/Register";
import Login from "./Login/Login";

const Auth = (props) => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.Title}>
        <h1>Todo-List</h1>
      </div>
      <div className={classes.AuthForm}>
        <p>{isRegister ? "Sign up for your account" : "Log in to Todo-list"}</p>

        {isRegister ? <Register /> : <Login />}
        <Button
          className={classes.btnSwitch}
          onClick={() => {
            setIsRegister((prevValue) => !prevValue);
          }}
        >
          <h4>
            {isRegister ? "Do you already have an account? Login" : "Register?"}
          </h4>
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.auth.users,
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetAuth: (user) => dispatch(actions.authUser(user)),
    onFetchUsers: () => dispatch(actions.fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
