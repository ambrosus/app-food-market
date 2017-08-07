const transactionsStatus = (state = {list: []}, action) => {
    switch (action.type) {
        case 'STATUS_ADD_SUCCESS_TRANSACTION':
        case 'STATUS_ADD_FAILED_TRANSACTION':
            let filtered = state.list.filter((transaction) => {
                return transaction.address !== action.data.address
            });

            return {
                list: [...filtered, action.data]
            };
        case 'STATUS_ADD_PENDING_TRANSACTION':
            return {
                list: [...state.list, action.data]
            };
        default:
            return state;
    }
};

export default transactionsStatus;
