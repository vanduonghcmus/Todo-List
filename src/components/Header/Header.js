import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "antd";

import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={classes.Header}>
      <h1>My Todo List</h1>
      <div className={classes.btnLOpenAuth}>
        <NavLink to="/logout">
          <Button onClick={props.Login} size="middle" className={classes.Login}>
            LOGOUT
          </Button>
        </NavLink>
      </div>
    </div>
  );
};
export default Header;
