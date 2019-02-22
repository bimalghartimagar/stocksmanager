import { combineReducers } from "redux";
import stocks from "./stocks";
import errors from "./errors";
import messages from "./messages";
import authReducer from "./auth";

export default combineReducers({
  stocksReducer: stocks,
  errors,
  messages,
  authReducer
});
