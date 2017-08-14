import Ambrosus from 'ambrosus';
import { statusAddPendingTransaction,
statusAddSuccessTransaction,
statusAddFailedTransaction } from './TransactionStatusAction.js';
import { showModal, hideModal } from './ModalAction.js';
import { executeEthereumTransaction } from './TransactionAction.js';

export const buy = (offer, quantity, token) => async(dispatch) => {
    let agreement = new Ambrosus.Agreement(offer.address, quantity, token.address);
    agreement.initiateAgreement((transactionHash) => {
      dispatch(statusAddPendingTransaction(transactionHash, 'Creating contract', ''));
      dispatch(showModal('TransactionProgressModal', { title: 'Creating contract' }));
    }).then((agreementContract) => {
      dispatch(statusAddSuccessTransaction(agreementContract.transactionHash, 'Creating contract', ''));
      dispatch(transfer(agreement, agreementContract));
    }).catch((reason) => {
      dispatch(showModal('ErrorModal', { reason }));
    });
  };

const transfer = (agreement, contract) => async (dispatch) => {
    agreement.transfer(contract, (transactionHash) => {
      dispatch(statusAddPendingTransaction(transactionHash, 'Transfer to escrow', ''));
      dispatch(showModal('TransactionProgressModal', { title: 'Transfer to escrow' }));
    }).then((tx) => {
      dispatch(statusAddSuccessTransaction(tx, 'Creating contract', ''));
      dispatch(hideModal());
    }).catch((reason) => {
      dispatch(showModal('ErrorModal', { reason }));
    });
  };

