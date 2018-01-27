import api from '../../api';
import abi from './abi.json';
import { getSignature } from '../../utils/utils.js';
import { CONTRACT_ADDRESS } from './../../constants';
export const LOAD_STATEMENTS_REQUEST   = 'LOAD_STATEMENTS_REQUEST';
export const LOAD_STATEMENTS_SUCCESS   = 'LOAD_STATEMENTS_SUCCESS';
export const LOAD_STATEMENTS_FAIL      = 'LOAD_STATEMENTS_FAIL';
export const CREATE_STATEMENT_REQUEST  = 'CREATE_STATEMENT_REQUEST';
export const CREATE_STATEMENT_SUCCESS  = 'CREATE_STATEMENT_SUCCESS';
export const CREATE_STATEMENT_FAIL     = 'CREATE_STATEMENT_FAIL';

export function loadStatements(tradeId) {
  return async (dispatch, getState) => {
    const [user] = web3.eth.accounts;
    dispatch({ type: LOAD_STATEMENTS_REQUEST });
    try {
      const signature = await getSignature(user, tradeId);
      const statements = await api.statements.list(tradeId, signature);
      dispatch({ type: LOAD_STATEMENTS_SUCCESS, statements });
    } catch (error) {
      dispatch({ type: LOAD_STATEMENTS_FAIL, error });
    }
  };
}

export function createStatement(tradeId, statement, statementId) {
  return async (dispatch, getState) => {
    const [user] = web3.eth.accounts;
    dispatch({ type: CREATE_STATEMENT_REQUEST });
    try {
      const signature = await getSignature(user, statementId);
      const statements = await api.statements.create({ tradeId, statement, signature });
      dispatch({ type: CREATE_STATEMENT_SUCCESS, statements });
    } catch (error) {
      dispatch({ type: CREATE_STATEMENT_FAIL, error });
    }
  };
};

export async function addStatement(tradeId, fileId) {
  const [user] = web3.eth.accounts;
  const MyContract = web3.eth.contract(abi);
  const contract = await MyContract.at(CONTRACT_ADDRESS);
  return new Promise(function (resolve, reject) {
    contract.addStatement(tradeId, fileId, { from: web3.eth.accounts[0] }, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

