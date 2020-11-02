import React, { useState } from "react";
import { connect } from "react-redux";

import Header from "../../components/Header/Header";
import Body from "../../components/Body/Body";
import TasksList from "../../components/Body/TasksList/TasksList";
import TaskForm from "../TaskForm/TaskForm";
import EditForm from "../EditForm/EditForm";
import openNotification from "../../components/UI/Notification/Notification";
import * as actions from "../../store/action/index";

const TaskBuilder = (props) => {
  const [isTaskForm, setIsTaskForm] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

  const [editTask, setEditTask] = useState({});

  const showTaskForm = () => {
    setIsTaskForm(true);
  };
  const closeTaskForm = () => {
    setIsTaskForm(false);
  };

  const showEditForm = (task) => {
    setVisibleEdit(true);
    setEditTask(task);
  };

  const closeEditForm = () => {
    setVisibleEdit(false);
  };

  return (
    <div>
      <Body>
        <Header />
        <TaskForm openTaskForm={isTaskForm} closeTaskForm={closeTaskForm} />
        <EditForm
          visible={visibleEdit}
          closeEditForm={closeEditForm}
          editTask={editTask}
          onDelete={(id) => {
            props.onDeletedTask(id);
            openNotification("success", "Delete Task");
          }}
        />
        <TasksList
          onOpenEdit={(task) => showEditForm(task)}
          onClick={showTaskForm}
        />
      </Body>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeletedTask: (id) => dispatch(actions.deleteTask(id)),
  };
};
export default connect(null, mapDispatchToProps)(TaskBuilder);
