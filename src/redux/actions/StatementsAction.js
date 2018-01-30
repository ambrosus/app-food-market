import api from '../../api';
import { getSignature } from '../../utils/utils.js';
import { hideModal, showModal } from '../actions/ModalAction';
import contractClient from '../../utils/contractClient';
import { promisify } from '../../utils/utils';

export const LOAD_STATEMENTS_SUCCESS   = 'LOAD_STATEMENTS_SUCCESS';
export const LOAD_STATEMENTS_FAIL      = 'LOAD_STATEMENTS_FAIL';
export const CREATE_STATEMENT_REQUEST  = 'CREATE_STATEMENT_REQUEST';
export const CREATE_STATEMENT_SUCCESS  = 'CREATE_STATEMENT_SUCCESS';
export const CREATE_STATEMENT_FAIL     = 'CREATE_STATEMENT_FAIL';
export const CLEAR_STATEMENTS          = 'CLEAR_STATEMENTS';

export function loadStatements(tradeId) {
  return async (dispatch, getState) => {
    if (!tradeId) {
      dispatch({ type: LOAD_STATEMENTS_FAIL, error: 'tradeId is undefined' });
      return;
    }

    const contract = contractClient.getInstance();
    const event = contract.Statement({ tradeId }, { fromBlock: 0, toBlock: 'latest' });
    const eventsList = await promisify(event, 'get') || [];
    const statementsList = eventsList.map(event => {
      const { statementId, from } = event.args;
      return { statementId: statementId.valueOf(), from };
    });
    dispatch(showModal('TransactionProgressModal', { title: 'Statements loading' }));
    try {
      const signature = await getSignature(user, tradeId);
      const statements = await api.statements.list(tradeId, signature);
      const statementsList =  statementsList.map(statement => {
        const statementData = statements ? statements.find(s => s.statementId === statement.statementId) : {};
        return { ...statementData, ...statement };
      });
      dispatch({ type: LOAD_STATEMENTS_SUCCESS, statements: statementsList });
      dispatch(hideModal());
    } catch (error) {
      dispatch({ type: LOAD_STATEMENTS_FAIL, error });
      dispatch(hideModal());
    }
  };
};

export function clearStatements() {
  return {
    type: CLEAR_STATEMENTS,
  };
};

export function createStatement(tradeId, statement) {
  return async (dispatch, getState) => {
    const [user] = web3.eth.accounts;
    dispatch({ type: CREATE_STATEMENT_REQUEST });
    try {
      const signature = await getSignature(user, tradeId);
      const statements = await api.statements.create({ tradeId, statement, signature });
      dispatch({ type: CREATE_STATEMENT_SUCCESS, statements });
    } catch (error) {
      dispatch({ type: CREATE_STATEMENT_FAIL, error });
    }
  };
};

export async function addStatement(tradeId, fileId) {
  const [user] = web3.eth.accounts;
  return await contractClient.run('addStatement', tradeId, fileId, { from: user });
};

export async function addParticipant(tradeId, participantAddress) {
  const [user] = web3.eth.accounts;
  return await contractClient.run('setPermission', tradeId, participantAddress, 2, { from: web3.eth.accounts[0] });
};
