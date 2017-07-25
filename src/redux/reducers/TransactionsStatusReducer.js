let nextId = 0;

const transactionsStatus = (state = {pending: [], success: [], failed: []}, action) => {
    switch (action.type) {

        case 'STATUS_ADD_PENDING_TRANSACTION':
            return {
                pending: [...state.pending, {
                    status: 'pending',
                    key: (nextId++).toString(),
                    tx: action.tx,
                    caption: action.caption,
                    url: action.url
                }],
                success: state.success,
                failed: state.failed
            };

        case 'STATUS_ADD_FAILED_TRANSACTION':
            return {
                failed: [...state.failed, {
                    status: 'failed',
                    key: (nextId++).toString(),
                    tx: action.tx,
                    caption: action.caption,
                    errorMessage: action.errorMessage
                }],
                success: state.success,
                pending: state.pending
            };

        case 'STATUS_ADD_SUCCESS_TRANSACTION':
            return {
                success: [...state.success, {
                    status: 'success',
                    key: (nextId++).toString(),
                    tx: action.tx,
                    caption: action.caption,
                    url: action.url
                }],
                failed: state.failed,
                pending: state.pending.filter((transaction) => transaction.tx != action.tx)
            };

        default:
            return state;
    }
};

export default transactionsStatus;
