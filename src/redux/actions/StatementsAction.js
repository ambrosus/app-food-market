import api from '../../api/apiFactory';
import { showModal, hideModal } from './ModalAction';
import { getSignature } from '../../utils/utils.js';
export const LOAD_STATEMENTS_REQUEST   = 'LOAD_STATEMENTS_REQUEST';
export const LOAD_STATEMENTS_SUCCESS   = 'LOAD_STATEMENTS_SUCCESS';
export const LOAD_STATEMENTS_FAIL      = 'LOAD_STATEMENTS_FAIL';
export const CREATE_STATEMENT_REQUEST  = 'CREATE_STATEMENT_REQUEST';
export const CREATE_STATEMENT_SUCCESS  = 'CREATE_STATEMENT_SUCCESS';
export const CREATE_STATEMENT_FAIL     = 'CREATE_STATEMENT_FAIL';

export function loadStatements(tradeId) {
  return async (dispatch, getState) => {
    dispatch({
      type: LOAD_STATEMENTS_REQUEST,
    });
    try {
      const signature = getSignature('some string');
      const statements = await api.statements.list(tradeId, signature);
      dispatch({ type: LOAD_STATEMENTS_SUCCESS, statements });
    } catch (error) {
      dispatch({ type: LOAD_STATEMENTS_FAIL, error });
    }
  };
}

export function createStatement(tradeId, statement) {
  console.log('API', api);

  return async (dispatch, getState) => {
    const { statements, modal, market } = getState();
    dispatch({ type: CREATE_STATEMENT_REQUEST });
    if (modal.name !== 'CreateStatementProgressModal') {
      dispatch(showModal('CreateStatementProgressModal', { title: 'Creating statements' }));
    }

    try {
      const signature = getSignature(address: market.address, statement);
      const statements = await api.statements.create({ tradeId, statement, signature });
      const { createdLength } = getState().statements;
      dispatch({ type: CREATE_STATEMENT_SUCCESS, statements });
      if (createdLength - 1 === 0) dispatch(hideModal());
    } catch (error) {
      const { createdLength } = getState().statements;
      dispatch({ type: CREATE_STATEMENT_FAIL, error });
      if (createdLength - 1 === 0) dispatch(hideModal());
    }
  };
}

