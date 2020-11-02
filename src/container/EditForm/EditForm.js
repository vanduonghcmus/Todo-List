import React, { useState } from "react";
import { connect } from "react-redux";
import { Radio, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import classes from "./EditForm.module.css";
import Modal from "../../components/UI/Modal/Modal";
import openNotification from "../../components/UI/Notification/Notification";
import * as actions from "../../store/action/index";

const EditTask = (props) => {
  // useEffect(() => {
  //   console.log(editTask);
  // }, [editTask]);
  const {
    editTask,
    isError,
    onChangeStatus,
    onDeleteTask,
    loading,
    closeEditForm,
    visible,
  } = props;
  const [presentStatus, setPresentStatus] = useState(editTask.status);

  const changeStatusHandler = (event) => {
    event.preventDefault();
    setPresentStatus(event.target.value);
  };

  const updateTask = () => {
    onChangeStatus(editTask.id, { ...editTask, status: presentStatus });
    setTimeout(() => {
      closeEditForm();
      isError
        ? openNotification("error", "Somethings went wrong!")
        : openNotification("success", "Update task success");
    }, 700);
  };

  const deleteTask = () => {
    onDeleteTask(editTask.id);
    setTimeout(() => {
      closeEditForm();
      isError
        ? openNotification("error", "Somethings went wrong!")
        : openNotification("success", "Delete task success");
    }, 500);
  };

  return (
    <Modal
      visible={visible}
      onCancel={closeEditForm}
      footer={[
        <Button
          icon={<DeleteOutlined />}
          size="middle"
          danger={true}
          type="primary"
          onClick={deleteTask}
          loading={loading}
        >
          DELETE
        </Button>,
        <Button
          icon={<EditOutlined />}
          size="middle"
          type="primary"
          onClick={updateTask}
          loading={loading}
        >
          SAVE
        </Button>,
      ]}
    >
      <div key={editTask.id} className={classes.EditForm}>
        <h2>{editTask.title}</h2>
        <p>{editTask.description}</p>
        <span>Status</span>:
        <Radio.Group
          className={classes.ButtonRadio}
          name="status"
          defaultValue={editTask.status}
          onChange={changeStatusHandler}
        >
          <Radio
            value="todo"
            disabled={editTask.status === "todo" ? true : false}
          >
            ToDo
          </Radio>
          <Radio
            value="working"
            disabled={editTask.status === "working" ? true : false}
          >
            Working
          </Radio>
          <Radio
            value="done"
            disabled={editTask.status === "done" ? true : false}
          >
            Done
          </Radio>
        </Radio.Group>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    isError: state.tasksList.error,
    loading: state.tasksList.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeStatus: (id, value) => dispatch(actions.putTask(id, value)),
    onDeleteTask: (id) => dispatch(actions.deleteTask(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
