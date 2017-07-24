var delay = require('timeout-as-promise');

const WEB3_LOAD_TIMEOUT = 1000;


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

export const statusAddPendingTransaction = (tx, caption, url) => {
    return {
        type: 'STATUS_ADD_PENDING_TRANSACTION',
        status: 'pending',
        tx, caption, url
    };
};

export const statusAddSuccessTransaction = (tx, caption, url) => {
    return {
        type: 'STATUS_ADD_SUCCESS_TRANSACTION',
        status: 'success',
        tx, caption, url
    };
};

export const statusAddFailedTransaction = (tx, caption, errorMessage) => {
    return {
        type: 'STATUS_ADD_FAILED_TRANSACTION',
        status: 'failed',
        tx, caption, errorMessage
    };
};

export const initWeb3 = () => {
    return { type: 'INIT_WEB3' };
};

export function waitForWeb3() {
  return function (dispatch) {
    return delay(WEB3_LOAD_TIMEOUT)
      .then(json =>
        dispatch(initWeb3())
      )
  }
}
