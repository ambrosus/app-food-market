import {statusAddPendingTransaction, statusAddSuccessTransaction, statusAddFailedTransaction} from './TransactionStatusAction.js';


const CHECK_TRANSACTION_STATUS_TIME = 1000;

export const executeEthereumTransaction = (promise, caption, url) => {
  return function (dispatch) {
      promise.then((tx) => { 
        dispatch(statusAddPendingTransaction(tx, caption, url));
        dispatch(watchPendingTransaction(tx, caption, url));
      }).catch((reason) => {
        dispatch(statusAddFailedTransaction("", caption, reason));
      });
  }  
}

export const watchPendingTransaction = (tx, caption, url) => {

  function checkStatus(tx, dispatch) {
    web3.eth.getTransaction(tx, function(error, transaction) {
      console.log(error, transaction);
      if (transaction.blockHash) {
        dispatch(statusAddSuccessTransaction(tx, caption, url));
      } else {
        setTimeout(() => checkStatus(tx, dispatch), CHECK_TRANSACTION_STATUS_TIME);
      }
    });
  }

  return function (dispatch) {
    checkStatus(tx, dispatch);
  }
}

