import {
    statusAddFailedTransaction,
    statusAddPendingTransaction,
    statusAddSuccessTransaction
} from './TransactionStatusAction.js';
import { showModal, hideModal } from './ModalAction.js';


const CHECK_TRANSACTION_STATUS_TIME = 1000;

const ERROR_MSG = "Transaction failed. Check if you have enough resources";

export const executeEthereumTransaction = (promise, caption, url) => function (dispatch) {
        promise.then((address) => {
            dispatch(statusAddPendingTransaction({ address, caption, url }));
            dispatch(watchPendingTransaction({ address, caption, url }));
          }).catch((reason) => {
            dispatch(statusAddFailedTransaction({ address: '', caption, reason }));
          });
      };

export const watchPendingTransaction = ({address, caption, url}) => {
    function checkStatus(address, dispatch) {
        web3.eth.getTransaction(address, function (error, transaction) {
            if (error) {
                dispatch(statusAddFailedTransaction({address: "", caption, error}));
            } else if (transaction.blockHash) {
                web3.eth.getTransactionReceipt(address, (error, transaction)=>{
                    if (error) {
                        dispatch(statusAddFailedTransaction({address: "", caption, error}));
                    }
                    else if (transaction.cumulativeGasUsed >= transaction.gasUsed) {
                        dispatch(showModal('ErrorModal', { reason: ERROR_MSG }));
                        dispatch(statusAddFailedTransaction({address: "", caption, ERROR_MSG}));
                    }
                    else {
                        dispatch(statusAddSuccessTransaction({address, caption, url}));
                        dispatch(hideModal());
                    }

                })
            } else {
                setTimeout(() => checkStatus(address, dispatch), CHECK_TRANSACTION_STATUS_TIME);
            }
        });
    }

    return function (dispatch) {
        checkStatus(address, dispatch);
      };
  };

