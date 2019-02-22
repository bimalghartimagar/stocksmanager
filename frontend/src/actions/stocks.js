import axios from "axios";

import { GET_STOCKS, DELETE_STOCK, ADD_STOCK } from "./types";
import { createMessage, returnErrors } from "./messages";
import { tokenBuild } from "./auth";

export const getStocks = () => (dispatch, getState) => {
  axios
    .get("/api/stocks/", tokenBuild(getState))
    .then(response => {
      dispatch({
        type: GET_STOCKS,
        payload: response.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteStock = id => (dispatch, getState) => {
  axios
    .delete(`/api/stocks/${id}`, tokenBuild(getState))
    .then(response => {
      dispatch({
        type: DELETE_STOCK,
        payload: id
      });
      dispatch(createMessage({ deleteStock: `Stock deleted with id: ${id}` }));
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addStock = stock => (dispatch, getState) => {
  axios
    .post("/api/stocks/", stock, tokenBuild(getState))
    .then(response => {
      dispatch({
        type: ADD_STOCK,
        payload: response.data
      });
      dispatch(
        createMessage({ addStock: `Stock added with id: ${response.data.id}` })
      );
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
