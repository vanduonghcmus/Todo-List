import React from "react";
import { Card } from "antd";

import classes from "./Task.module.css";

const Task = (props) => {
  return (
    <Card
      className={classes.Task}
      type="inner"
      title={props.title}
      onClick={props.openEditForm}
      style={{ marginTop: 16 }}
    >
      {props.description}
    </Card>
  );
};

export default Task;
