import Ambrosus from 'ambrosus';
import TransactionBuilder from '../../utils/transactionBuilder';
import { hideModal, showModal } from '../actions/ModalAction';
import contractClient from '../../utils/contractClient';
import api from '../../api';

export const buy = (marketAddress, offer, quantity, history) => async (dispatch) => {
  const [user] = web3.eth.accounts;
  const response = await api.events.createEvent(offer.origin, 'createTrade', user);
  if (!response) {
    dispatch(showModal('ErrorModal', { reason: 'Transaction has been failed' }));
    return;
  }
  const contract = contractClient.getInstance();
  const transactionParams = { from: user, gas: 300000, to: offer.seller };
  dispatch(showModal('TransactionProgressModal', { title: 'Transaction approval' }));
  await contract.makeTrade(offer.address, transactionParams, function (err, res) {
    if (err) dispatch(showModal('ErrorModal', { reason: 'Transaction has been failed' }));
    else dispatch(hideModal());
  });

  localStorage.clear();
};

export const approve = (agreementAddress, history) => async (dispatch) => {
  let agreement = await new Ambrosus.AgreementRepository().fromAddress(agreementAddress);
  new TransactionBuilder(dispatch, agreement.accept.bind(agreement)).
    setTitle('Approve transaction').
    onSuccessCallback(()=>history.push('orders')).
    send();
};

export const reject = (agreementAddress, history) => async (dispatch) => {
  let agreement = await new Ambrosus.AgreementRepository().fromAddress(agreementAddress);
  new TransactionBuilder(dispatch, agreement.reject.bind(agreement)).
    setTitle('Reimburse transaction').
    onSuccessCallback(()=>history.push('orders')).
    send();
};
