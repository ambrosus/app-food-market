import api from '../../api';
import { getSignature } from '../../utils/utils.js';
import { hideModal, showModal } from '../actions/ModalAction';
import contractClient from '../../utils/contractClient';
import { promisify } from '../../utils/utils';

export function loadStatements(tradeId) {
  return async (dispatch, getState) => {
    if (!tradeId) {
      dispatch(showModal('ErrorModal', { reason: 'Trade id is undefined' }));
      return;
    }

    dispatch(showModal('TransactionProgressModal', { title: 'Statements loading' }));
    const contract = contractClient.getInstance();
    const event = contract.Statement({ tradeId }, { fromBlock: 0, toBlock: 'latest' });
    const eventsList = await promisify(event, 'get') || [];
    const statementsList = eventsList.map(e => ({
      statementId: e.args.statementId.valueOf(),
      statementType: e.args.statementType.valueOf(),
      from: e.args.from,
    }));
    try {
      const [user] = web3.eth.accounts;
      const signature = await getSignature(user, tradeId);
      const statementsFromBE = await api.statements.list(tradeId, signature);
      let statements = [];
      if (statementsFromBE.length) {
        statementsFromBE.forEach(statement => {
          const statementData = statementsList.find(s => s.statementId === statement.statementId);
          if (statementData) statements.push({ ...statement, ...statementData });
        });
      }
      dispatch({ type: 'FETCH_STATEMENTS_SUCCESS', statements });
      dispatch(hideModal());
    } catch (err) {
      console.warn('FETCH_STATEMENTS_FAILED', err);
      dispatch(showModal('ErrorModal', { reason: err }));
    }
  };
};

export function createStatement(tradeId, statement, statementId) {
  return async (dispatch, getState) => {
    const [user] = web3.eth.accounts;
    try {
      const signature = await getSignature(user, tradeId);
      await api.statements.create({ tradeId, statement, signature, statementId });
    } catch (err) {
      console.warn('CREATE_STATEMENT_FAILED', err);
      dispatch(showModal('ErrorModal', { reason: err }));
    }
  };
};

export function addStatement(tradeId, isFile, statement, fileData, history) {
  return async(dispatch) => {
    dispatch(showModal('TransactionProgressModal', { title: 'Statement creation' }));
    const [user] = web3.eth.accounts;
    const type = isFile ? 1 : 0;
    const contract = contractClient.getInstance();
    await contractClient.run('addStatement', tradeId, type, { from: user, gas: 70000 });
    const event = contract.Statement({ tradeId });
    let isEventCreated = false;
    event.watch(async (err, res) => {
      if (err) dispatch(showModal('ErrorModal', { reason: err }));
      else {
        if (!isEventCreated) {
          const statementId = res.args.statementId.valueOf();
          if (isFile) {
            const response = await api.files.uploadFile(statementId, fileData, 'statement');
            if (!response) return  dispatch(showModal('ErrorModal', { reason: 'File is too big' }));
          }
          await dispatch(createStatement(tradeId, statement, statementId));
          history.push('product-info');
        }
        isEventCreated  = true;
      }
    });
  }
};

export async function addParticipant(tradeId, participantAddress) {
  const [user] = web3.eth.accounts;
  return await contractClient.run('setPermission', tradeId, participantAddress, 2, { from: web3.eth.accounts[0] });
};
