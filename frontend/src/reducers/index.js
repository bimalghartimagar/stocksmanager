import { combineReducers } from "redux";
import stocks from "./stocks";

export default combineReducers({
  stocksReducer: stocks
});
