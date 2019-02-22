import axios from "axios";
import { returnErrors } from "./messages";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from "./types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING
  });

  axios
    .get("/api/auth/user", tokenBuild(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const login = (username, password) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth/login", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

export const signup = ({ username, password, email }) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ username, password, email });

  axios
    .post("/api/auth/signup", body, config)
    .then(res => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: SIGNUP_FAIL
      });
    });
};

export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout", null, tokenBuild(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// helpers
export const tokenBuild = getState => {
  const token = getState().authReducer.token;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
