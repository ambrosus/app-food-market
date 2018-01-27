import {
  LOAD_STATEMENTS_REQUEST,
  LOAD_STATEMENTS_SUCCESS,
  LOAD_STATEMENTS_FAIL,
  CREATE_STATEMENT_REQUEST,
  CREATE_STATEMENT_SUCCESS, CREATE_STATEMENT_FAIL,
  CLEAR_STATEMENTS
} from './../actions/StatementsAction';

const defaultState = {
  list: [],
  error: null,
};

const statements = (state = defaultState, action) => {
  switch (action.type) {
    case LOAD_STATEMENTS_SUCCESS:
      return { ...state, list: action.statements, };
    case LOAD_STATEMENTS_FAIL:
      return { ...state, isLoading: false };
    case CREATE_STATEMENT_REQUEST:
      return { ...state, isLoading: true };
    case CREATE_STATEMENT_SUCCESS:
      return { ...state, list: action.statements, };
    case CREATE_STATEMENT_FAIL:
      return { ...state, error: action.error, };
    case CLEAR_STATEMENTS:
      return { ...state, list: [], error: null, };
    default:
      return state;
  }
};

export default statements;
