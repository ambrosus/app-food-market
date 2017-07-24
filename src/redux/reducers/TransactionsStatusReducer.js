const transactionsStatus = (state = {pending: [], success: [], failed: []}, action) => {
    switch (action.type) {
        case 'STATUS_ADD_PENDING_TRANSACTION':
            return {pending: [...state.pending, {
                    status: 'pending',
                    tx: action.tx,
                    caption: action.caption,
                    url: action.url
                }],
                success: state.success,
                failed: state.failed}
        default:
            return state;
    }
};

export default transactionsStatus;
