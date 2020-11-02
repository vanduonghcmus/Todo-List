import axios from "../../Axios";
import * as actionTypes from "./actionsType";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authUser = (user) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("/users", user)
      .then((res) => {
        dispatch(authSuccess(user));
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        dispatch(authFail(err));
        console.log(err);
      });
  };
};

export const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USER_START,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    users: users,
  };
};

export const fetchUsersFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_FAIL,
    error: error,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersStart());
    axios
      .get("/users")
      .then((res) => {
        dispatch(fetchUsersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchUsersFail(err));
      });
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  };
};
