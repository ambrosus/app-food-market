import {statusAddPendingTransaction, statusAddSuccessTransaction, statusAddFailedTransaction} from './TransactionStatusAction.js';

const CHECK_TRANSACTION_STATUS_TIME = 1000;

export const sendTransaction = (to, value) => {
  return function (dispatch) {
      var args = {to, value};
      web3.eth.sendTransaction(args, (e, r) => { 
        if (e) {
          dispatch(statusAddFailedTransaction("","Random transaction", e));
        } else {
          dispatch(statusAddPendingTransaction(r, "Random transaction", "/"));
          dispatch(watchPendingTransaction(r, "Random transaction", "/"));
        }
      });
  }  
}

export const watchPendingTransaction = (tx, label, url) => {

  function checkStatus(tx, dispatch) {
    web3.eth.getTransaction(tx, function(error, transaction) {
      if (transaction.blockHash) {
        dispatch(statusAddSuccessTransaction(tx));
      } else {
        setTimeout(checkStatus, CHECK_TRANSACTION_STATUS_TIME);
      }
    });
  }

  return function (dispatch) {
    checkStatus(tx, dispatch);
  }
}

