import {
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_USER,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS
} from "../actions/types";

const initialState = {
  user: null,
  isAuthenticated: null,
  token: localStorage.getItem("token"),
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };

    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };

    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };

    default:
      return state;
  }
}
