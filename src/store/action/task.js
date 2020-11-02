import axios from "../../Axios";
import * as actionType from "./actionsType";

export const postTaskSuccess = (task) => {
  return {
    type: actionType.POST_TASK_SUCCESS,
    task: task,
  };
};

export const postTaskFail = (error) => {
  return {
    type: actionType.POST_TASK_FAIL,
    error: error,
  };
};

export const postTaskStart = () => {
  return {
    type: actionType.POST_TASK_START,
  };
};

export const postTask = (task) => {
  return (dispatch) => {
    dispatch(postTaskStart());
    axios
      .post(`/users/${localStorage.getItem("userId")}/tasks`, task)
      .then((res) => {
        dispatch(postTaskSuccess(task));
      })
      .catch((err) => {
        dispatch(postTaskFail(err));
      });
  };
};

export const fetchTaskStart = () => {
  return {
    type: actionType.FETCH_TASK_START,
  };
};

export const fetchTaskSuccess = (tasks) => {
  return {
    type: actionType.FETCH_TASK_SUCCESS,
    tasks: tasks,
  };
};
export const fetchTaskFail = (error) => {
  return {
    type: actionType.FETCH_TASK_FAIL,
    error: error,
  };
};

// asynchorous code
export const fetchTask = () => {
  return (dispatch) => {
    dispatch(fetchTaskStart());
    axios
      .get(`/users/${localStorage.getItem("userId")}/tasks`)
      .then((res) => {
        dispatch(fetchTaskSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchTaskFail(err));
      });
  };
};

export const deleteTaskStart = () => {
  return {
    type: actionType.DELETE_TASK_START,
  };
};

export const deleteTaskSuccess = (id) => {
  return {
    type: actionType.DELETE_TASK_SUCCESS,
    id: id,
  };
};

export const deleteTaskFail = (error) => {
  return {
    type: actionType.DELETE_TASK_FAIL,
    error: error,
  };
};

export const deleteTask = (id) => {
  return (dispatch) => {
    dispatch(deleteTaskStart());
    axios
      .delete(`/users/${localStorage.getItem("userId")}/tasks/${id}`)
      .then((res) => {
        dispatch(deleteTaskSuccess(id));
      })
      .catch((err) => {
        dispatch(deleteTaskFail(err));
      });
  };
};

export const putTaskStart = () => {
  return {
    type: actionType.PUT_TASK_START,
  };
};

export const putTaskSuccess = (id, value) => {
  return {
    type: actionType.PUT_TASK_SUCCESS,
    id: id,
    value: value,
  };
};

export const putTaskFail = (error) => {
  return {
    type: actionType.PUT_TASK_FAIL,
    error: error,
  };
};

export const putTask = (id, value) => {
  return (dispatch) => {
    dispatch(putTaskStart());
    axios
      .put(`/users/${localStorage.getItem("userId")}/tasks/${id}`, value)
      .then((res) => {
        dispatch(putTaskSuccess(id, value));
      })
      .catch((err) => {
        dispatch(putTaskFail(err));
      });
  };
};
