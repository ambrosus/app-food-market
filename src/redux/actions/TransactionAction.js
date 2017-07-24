import {statusAddPendingTransaction, statusAddSuccessTransaction, statusAddFailedTransaction} from './TransactionStatusAction.js';

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
  return function (dispatch) {
    console.log("watch:", tx, label, url);
  }
}

