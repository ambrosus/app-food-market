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
              pending: state.stats.pending - 1,
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
              pending: state.stats.pending - 1,
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
    default:
      return state;
  }
  };

export default transactionsStatus;
