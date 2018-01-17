import {
  LOAD_STATEMENTS_REQUEST,
  LOAD_STATEMENTS_SUCCESS,
  LOAD_STATEMENTS_FAIL,
  CREATE_STATEMENT_REQUEST,
  CREATE_STATEMENT_SUCCESS, CREATE_STATEMENT_FAIL
} from './../actions/StatementsAction';

const defaultState = {
  list: [],
  createdLength: 0,
  isLoading: false,
};

const statements = (state = defaultState, action) => {
  switch (action.type) {
    case LOAD_STATEMENTS_REQUEST:
      return { ...state, isLoading: true };
    case LOAD_STATEMENTS_SUCCESS:
      return { ...state, statements: action.statements, isLoading: false };
    case LOAD_STATEMENTS_FAIL:
      return { ...state, isLoading: false };
    case CREATE_STATEMENT_REQUEST:
      return { ...state, createdLength: state.createdLength + 1 };
    case CREATE_STATEMENT_SUCCESS:
      return { ...state, statements: action.statements, createdLength: state.createdLength - 1 };
    case CREATE_STATEMENT_FAIL:
      return { ...state, createdLength: action.createdLength };
    default:
      return state;
  }
};

export default statements;
