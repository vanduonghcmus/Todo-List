import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FormOutlined } from "@ant-design/icons";
import { Card, Row, Col, Button } from "antd";

import classes from "./TasksList.module.css";
import Task from "./Task/Task";
import * as actions from "../../../store/action/index";

const TasksList = (props) => {
  const { onFetchTasks } = props;
  useEffect(() => {
    onFetchTasks();
  }, [onFetchTasks]);

  return (
    <div className={classes.TasksList}>
      <div className="site-card-wrapper">
        <Row gutter={12}>
          <Col span={8}>
            <Card
              className={classes.List}
              bordered={true}
              loading={props.isLoading}
            >
              <h2 className={[classes.Title, classes.Todo].join(" ")}>Todo</h2>
              {props.tasksList
                .filter((result) => {
                  return result.status === "todo";
                })
                .map((task) => {
                  return (
                    <Task
                      key={task.id}
                      title={task.title}
                      description={task.description}
                      onDelete={() => props.onDeleteTask(task.id)}
                      openEditForm={() => props.onOpenEdit(task)}
                    />
                  );
                })}
            </Card>
          </Col>
          <Col span={8}>
            <Card
              className={classes.List}
              bordered={true}
              loading={props.isLoading}
            >
              <h2 className={[classes.Title, classes.Working].join(" ")}>
                Working
              </h2>
              {props.tasksList
                .filter((result) => {
                  return result.status === "working";
                })
                .map((task) => {
                  return (
                    <Task
                      key={task.id}
                      title={task.title}
                      description={task.description}
                      openEditForm={() => props.onOpenEdit(task)}
                    />
                  );
                })}
            </Card>
          </Col>
          <Col span={8}>
            <Card
              className={classes.List}
              bordered={true}
              loading={props.isLoading}
            >
              <h2 className={[classes.Title, classes.Done].join(" ")}>Done</h2>
              {props.tasksList
                .filter((result) => {
                  return result.status === "done";
                })
                .map((task, index) => {
                  return (
                    <Task
                      key={index}
                      title={task.title}
                      description={task.description}
                      onDelete={() => props.onDeleteTask(task.id)}
                      openEditForm={() => props.onOpenEdit(task)}
                    />
                  );
                })}
            </Card>
          </Col>
        </Row>
      </div>
      <Button
        className={classes.btnOpenForm}
        shape="circle"
        onClick={props.onClick}
        size="large"
      >
        <FormOutlined style={{ fontSize: "1.6rem" }} />
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tasksList: state.tasksList.tasksList,
    isLoading: state.tasksList.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTasks: () => dispatch(actions.fetchTask()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
