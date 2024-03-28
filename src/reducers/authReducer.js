import { LOGIN_USER, LOGOUT_USER, LOGIN_USER_FAILURE, CLEAR_ERROR } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      if (action.payload.access_token) {
        return {
          ...state,
          isAuthenticated: true,
        };
      } else {
        return state;
      }
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        error: action.payload.message,
      };
    case CLEAR_ERROR:
    return {
      ...state,
      error: null,
    };
    default:
      return state;
  }
};

export default authReducer;
