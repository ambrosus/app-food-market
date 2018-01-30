import Ambrosus from 'ambrosus';
import TransactionBuilder from '../../utils/transactionBuilder';
import { hideModal, showModal } from '../actions/ModalAction';
import contractClient from '../../utils/contractClient';

export const buy = (marketAddress, offer, quantity, history) => async (dispatch) => {
  const contract = contractClient.getInstance();
  const [user] = web3.eth.accounts;
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
