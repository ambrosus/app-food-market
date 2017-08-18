import Ambrosus from 'ambrosus';
import {
  statusAddPendingTransaction,
  statusAddSuccessTransaction,
  statusAddFailedTransaction,
} from './TransactionStatusAction.js';
import { showModal, hideModal } from './ModalAction.js';
import { executeEthereumTransaction } from './TransactionAction.js';

export const buy = (marketAddress, offer, quantity, history) => async (dispatch) => {
  let agreement = new Ambrosus.AgreementRepository(marketAddress);
  dispatch(showModal('TransactionProgressModal', { title: 'Transfer to ESCROW' }));
  let tx = '';
  agreement.initiateAgreement(offer.address, quantity, (transactionHash) => {
    dispatch(statusAddPendingTransaction({
      address: transactionHash,
      caption: 'Transfer to ESCROW',
      url: '',
    }));
    tx = transactionHash;
  }).then((transactionHash) => {
    dispatch(statusAddSuccessTransaction({
      address: transactionHash,
      caption: 'Transfer to ESCROW',
      url: '',
    }));
    dispatch(hideModal());
    history.push('orders');
  }).catch((reason) => {
    console.error(reason);
    dispatch(showModal('ErrorModal', { reason }));
    dispatch(statusAddFailedTransaction({
      address: tx,
      caption: 'Transfer to ESCROW',
      errors: reason,
    }));
  });
};

export const approve = (agreementAddress, history) => async (dispatch) => {
  dispatch(showModal('TransactionProgressModal', { title: 'Approve transaction' }));
  let agreement = await new Ambrosus.AgreementRepository().fromAddress(agreementAddress);
  let transactionHash = '';
  agreement.accept((tx) => {
    transactionHash = tx;
    dispatch(statusAddPendingTransaction({
      address: tx,
      caption: 'Approve transaction',
      url: '',
    }));
  }).then((tx) => {
    dispatch(statusAddSuccessTransaction({
      address: tx,
      caption: 'Approve transaction',
      url: '',
    }));
    dispatch(hideModal());
    history.push('orders');
  }).catch((reason) => {
    dispatch(showModal('ErrorModal', { reason }));
    dispatch(statusAddFailedTransaction({
      address: transactionHash,
      caption: 'Approve transaction',
      errors: reason,
    }));
  });
};

export const reject = (agreementAddress, history) => async (dispatch) => {
  dispatch(showModal('TransactionProgressModal', { title: 'Reimburse transaction' }));
  let agreement = await new Ambrosus.AgreementRepository().fromAddress(agreementAddress);
  let transactionHash = '';
  agreement.reject((tx) => {
    transactionHash = tx;
    dispatch(statusAddPendingTransaction({
      address: tx,
      caption: 'Reimburse transaction',
      url: '',
    }));
  }).then((tx) => {
    dispatch(statusAddSuccessTransaction({
      address: tx,
      caption: 'Reimburse transaction',
      url: '',
    }));
    dispatch(hideModal());
    history.push('orders');
  }).catch((reason) => {
    dispatch(showModal('ErrorModal', { reason }));
    dispatch(statusAddFailedTransaction({
      address: transactionHash,
      caption: 'Reimburse transaction',
      errors: reason,
    }));
  });
};
