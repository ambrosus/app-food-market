export const statusAddPendingTransaction = ({address, caption, url}) => {
    return {
        type: 'STATUS_ADD_PENDING_TRANSACTION',
        data: {
            status: 'pending',
            address: address,
            type: caption,
            url: url,
            isRead: false
        }
    };
};

export const statusAddSuccessTransaction = ({address, caption, url}) => {
    return {
        type: 'STATUS_ADD_SUCCESS_TRANSACTION',
        data: {
            status: 'pending',
            address: address,
            type: caption,
            url: url,
            isRead: false
        }
    };
};

export const statusAddFailedTransaction = ({address, caption, errorMessage}) => {
    return {
        type: 'STATUS_ADD_FAILED_TRANSACTION',
        status: 'failed',
        data: {
            status: 'pending',
            address: address,
            type: caption,
            isRead: false,
            errorMessage: errorMessage
        }
    };
};