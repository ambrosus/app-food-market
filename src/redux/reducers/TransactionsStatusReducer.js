

const transactionsStatus = (state = {
  list: [],
  stats: {
    failed: 0,
    pending: 0,
    approved: 0,
  },
}, action) => {
  switch (action.type) {
    case 'STATUS_ADD_SUCCESS_TRANSACTION':
      let others = state.list.filter((transaction) => transaction.address !== action.data.address);

      return {
        list: [...others, action.data],
        stats: {
          approved: state.stats.approved + 1,
          failed: state.stats.failed,
          pending: Math.max(state.stats.pending - 1, 0),
        },
      };
      break;

    case 'STATUS_ADD_FAILED_TRANSACTION':
      let filtered = state.list.filter((transaction) => transaction.address !== action.data.address);
      return {
        list: [...filtered, action.data],
        stats: {
          approved: state.stats.approved,
          failed: state.stats.failed + 1,
          pending: Math.max(state.stats.pending - 1, 0),
        },
      };
      break;
    case 'STATUS_ADD_PENDING_TRANSACTION':
      return {
        list: [...state.list, action.data],
        stats: {
          approved: state.stats.approved,
          failed: state.stats.failed,
          pending: state.stats.pending + 1,
        },
      };
    case 'READ_NOTIFICATION':
      return {
        ...state,
        list: state.list.map(notification => notification.address == action.address ? {
          ...notification, isRead: true,
        } : notification),
      };
    case 'READ_ALL':
      return {
        ...state,
        list: state.list.map(notification => notification.status !== 'pending' ? {
          ...notification, isRead: true,
        } : notification),
        stats: {
          approved: 0,
          failed: 0,
          pending: state.stats.pending,
        },
      };
    default:
      return state;
  }
};

export default transactionsStatus;
