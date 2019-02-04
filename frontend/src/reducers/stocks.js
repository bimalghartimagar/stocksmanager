import { GET_STOCKS, DELETE_STOCK, ADD_STOCK } from "../actions/types.js";

const initialState = {
  stocks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STOCKS:
      return {
        ...state,
        stocks: action.payload
      };
    case DELETE_STOCK:
      return {
        ...state,
        stocks: state.stocks.filter(stock => stock.id != action.payload)
      };
    case ADD_STOCK:
      return {
        ...state,
        stocks: [...state.stocks, action.payload]
      };
    default:
      return state;
  }
}
