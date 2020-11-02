import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";

import classes from "./TaskForm.module.css";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Spinner from "../../components/UI/Spinner/Spinner";
import openNotification from "../../components/UI/Notification/Notification";
import * as actions from "../../store/action/index";

const defaultTask = { title: "", description: "", status: "todo" };

const TaskForm = (props) => {
  const [task, setTask] = useState(defaultTask);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onPostTask(task);
    setTimeout(() => {
      setTask(defaultTask);
      props.closeTaskForm();
      if (props.isError) {
        openNotification("error", "Somethings went wrong!");
      } else {
        openNotification("success", "Add Task Success");
        props.onFetchTasks();
      }
    }, 600);
  };

  let taskForm = <Spinner />;
  if (!props.isLoading) {
    taskForm = (
      <div>
        <Form.Item label="Title">
          <Input name="title" value={task.title} onChange={onChangeHandler} />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            name="description"
            value={task.description}
            onChange={onChangeHandler}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: "3px" }}>
          <Button
            onClick={onSubmitHandler}
            className={[classes.Button, classes["Success"]].join(" ")}
            loading={props.isLoading}
            disabled={task.title.trim() === "" ? true : false}
          >
            SUBMIT
          </Button>
          <Button
            className={[classes.Button, classes["Cancel"]].join(" ")}
            onClick={props.closeTaskForm}
          >
            CANCEL
          </Button>
        </Form.Item>
      </div>
    );
  }

  return (
    <div>
      <Backdrop show={props.openTaskForm} onClick={props.closeTaskForm} />
      <Form
        className={classes.TaskForm}
        style={{
          transform: props.openTaskForm
            ? "translateY(0)"
            : "translateX(-200vh)",
          opacity: props.openTaskForm ? "1" : "0",
        }}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 18,
        }}
        layout="horizontal"
        size="default"
      >
        <h2>CREATE NEW TASK</h2>
        {taskForm}
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tasksList: state.tasksList.tasksList,
    isLoading: state.tasksList.loading,
    isError: state.tasksList.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPostTask: (task) => dispatch(actions.postTask(task)),
    onFetchTasks: () => dispatch(actions.fetchTask()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
