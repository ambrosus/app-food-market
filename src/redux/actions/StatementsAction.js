import api from '../../api';
import { getSignature } from '../../utils/utils.js';
export const LOAD_STATEMENTS_REQUEST   = 'LOAD_STATEMENTS_REQUEST';
export const LOAD_STATEMENTS_SUCCESS   = 'LOAD_STATEMENTS_SUCCESS';
export const LOAD_STATEMENTS_FAIL      = 'LOAD_STATEMENTS_FAIL';
export const CREATE_STATEMENT_REQUEST  = 'CREATE_STATEMENT_REQUEST';
export const CREATE_STATEMENT_SUCCESS  = 'CREATE_STATEMENT_SUCCESS';
export const CREATE_STATEMENT_FAIL     = 'CREATE_STATEMENT_FAIL';

export function loadStatements(tradeId) {
  return async (dispatch, getState) => {
    const { address } = getState().market;
    dispatch({ type: LOAD_STATEMENTS_REQUEST });
    try {
      const signature = await getSignature(address, tradeId);
      const statements = await api.statements.list(tradeId, signature);
      dispatch({ type: LOAD_STATEMENTS_SUCCESS, statements });
    } catch (error) {
      dispatch({ type: LOAD_STATEMENTS_FAIL, error });
    }
  };
}

export function createStatement(tradeId, statement) {
  return async (dispatch, getState) => {
    const { address } = getState().market;
    dispatch({ type: CREATE_STATEMENT_REQUEST });
    try {
      const signature = await getSignature(address, statement);
      const statements = await api.statements.create({ tradeId, statement, signature });
      dispatch({ type: CREATE_STATEMENT_SUCCESS, statements });
    } catch (error) {
      dispatch({ type: CREATE_STATEMENT_FAIL, error });
    }
  };
}

