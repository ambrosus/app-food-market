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