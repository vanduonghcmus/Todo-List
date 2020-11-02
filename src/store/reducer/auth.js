import * as actionTypes from "../action/actionsType";

const initialState = {
  users: [],
  isRegister: false,
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: {
      return { ...state, loading: true };
    }
    case actionTypes.AUTH_SUCCESS: {
      const newUser = { ...action.user };
      return {
        ...state,
        users: state.users.concat(newUser),
        loading: false,
      };
    }
    case actionTypes.AUTH_FAIL: {
      return { ...state, loading: false };
    }
    case actionTypes.FETCH_USER_START: {
      return { ...state, loading: true };
    }
    case actionTypes.FETCH_USER_SUCCESS: {
      return { ...state, users: action.users, loading: false };
    }
    case actionTypes.FETCH_USER_FAIL: {
      return { ...state, loading: false };
    }

    default:
      return { ...state };
  }
};

export default reducer;
