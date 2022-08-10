import {
  ADD_EXPENSE, DELETE_BTN, RECEIVE_API_SUCCESS, TOTAL_SUM, UPDATE_SUM,
} from '../actions/actionType';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idToEdit: 0,
  totalSum: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_API_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case TOTAL_SUM:
    return {
      ...state,
      totalSum: state.totalSum + action.payload,
    };
  case DELETE_BTN:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case UPDATE_SUM:
    return {
      ...state,
      totalSum: state.totalSum - action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
