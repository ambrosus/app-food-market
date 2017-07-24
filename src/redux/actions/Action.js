export const statusAddPendingTransaction = (tx, caption, url) => {
    return {
        type: 'STATUS_ADD_PENDING_TRANSACTION',
        status: 'pending',
        tx, caption,
        url
    };
};