import Ambrosus from 'ambrosus';
import { statusAddPendingTransaction,
statusAddSuccessTransaction,
statusAddFailedTransaction } from './TransactionStatusAction.js';
import { showModal, hideModal } from './ModalAction.js';

export const buy = (offer, quantity, token) => async(dispatch) => {
    let agreement = new Ambrosus.Agreement(offer.address, quantity, token.address);
    agreement.initiateAgreement((transactionHash) => {
      dispatch(statusAddPendingTransaction(transactionHash, 'Transfer to escrow', ''));
      dispatch(showModal('TransactionProgressModal', { title: 'Transfer to escrow' }));
    }).then((agreementContract) => {
      dispatch(statusAddSuccessTransaction(agreementContract.transactionHash, 'Transfer to escrow', ''));
      dispatch(hideModal());
    }).catch((reason) => {
      dispatch(showModal('ErrorModal', { reason }));
    });
  };
