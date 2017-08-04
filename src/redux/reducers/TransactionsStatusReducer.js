const transactionsStatus = (state = {list: [
    {
        status: 'success',
        time: '5 seconds',
        type: 'Example',
        address: 'asdfasdf',
        isRead: false
    }
]}, action) => {
    switch (action.type) {
        case 'STATUS_ADD_SUCCESS_TRANSACTION':
        case 'STATUS_ADD_FAILED_TRANSACTION':
        case 'STATUS_ADD_PENDING_TRANSACTION':
            return {
                list: [...state.list, action.data]
            };
        default:
            return state;
    }
};

export default transactionsStatus;
