import axios from "axios";

import { GET_STOCKS, DELETE_STOCK, ADD_STOCK } from "./types";

export const getStocks = () => dispatch => {
  axios
    .get("/api/stocks/")
    .then(response => {
      dispatch({
        type: GET_STOCKS,
        payload: response.data
      });
    })
    .catch(err => console.log(err));
};

export const deleteStock = id => dispatch => {
  axios
    .delete(`/api/stocks/${id}`)
    .then(response => {
      dispatch({
        type: DELETE_STOCK,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

export const addStock = stock => dispatch => {
  axios
    .post("/api/stocks/", stock)
    .then(response => {
      dispatch({
        type: ADD_STOCK,
        payload: response.data
      });
    })
    .catch(err => console.log(err));
};
