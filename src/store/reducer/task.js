import * as actionsType from "../action/actionsType";

const initialState = { tasksList: [], loading: false, error: false };

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.POST_TASK_START: {
      return { ...state, loading: true, error: false };
    }
    case actionsType.POST_TASK_SUCCESS: {
      const newTask = { ...action.task };
      return {
        ...state,
        loading: false,
        tasksList: state.tasksList.concat(newTask),
        error: false,
      };
    }
    case actionsType.POST_TASK_FAIL: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case actionsType.FETCH_TASK_START: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case actionsType.FETCH_TASK_SUCCESS: {
      return {
        ...state,
        tasksList: action.tasks,
        loading: false,
        error: false,
      };
    }
    case actionsType.FETCH_TASK_FAIL: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case actionsType.DELETE_TASK_START: {
      return { ...state, loading: true, error: false };
    }
    case actionsType.DELETE_TASK_SUCCESS: {
      const updateTasksList = state.tasksList.filter((result) => {
        return result.id !== action.id;
      });
      return {
        ...state,
        tasksList: updateTasksList,
        loading: false,
        error: false,
      };
    }
    case actionsType.DELETE_TASK_FAIL: {
      return { ...state, loading: false, error: true };
    }
    case actionsType.PUT_TASK_START: {
      return { ...state, loading: true, error: false };
    }
    case actionsType.PUT_TASK_SUCCESS: {
      const selectedTask = state.tasksList.find((result) => {
        return result.id === action.id;
      });
      selectedTask.status = action.value.status;
      return { ...state, loading: false, error: false };
    }
    case actionsType.PUT_TASK_FAIL: {
      return { ...state, loading: false, error: true };
    }
    default:
      return state;
  }
};

export default taskReducer;
