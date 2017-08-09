import {
    statusAddFailedTransaction,
    statusAddPendingTransaction,
    statusAddSuccessTransaction
} from './TransactionStatusAction.js';

const CHECK_TRANSACTION_STATUS_TIME = 1000;

export const executeEthereumTransaction = (promise, caption, url) => {
    return function (dispatch) {
        promise.then((address) => {
            dispatch(statusAddPendingTransaction({address, caption, url}));
            dispatch(watchPendingTransaction({address, caption, url}));
        }).catch((reason) => {
            dispatch(statusAddFailedTransaction({address:"", caption, reason}));
        });
    }
};

export const watchPendingTransaction = (tx, caption, url) => {

    function checkStatus(address, dispatch) {
        web3.eth.getTransaction(address, function (error, transaction) {
            if (error) {
                dispatch(statusAddFailedTransaction({address: "", caption, error}));
            } else if (transaction.blockHash) {
                dispatch(statusAddSuccessTransaction({address, caption, url}));
            } else {
                setTimeout(() => checkStatus(tx, dispatch), CHECK_TRANSACTION_STATUS_TIME);
            }
        });
    }

    return function (dispatch) {
        checkStatus(address, dispatch);
    }
};

