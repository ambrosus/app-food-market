const token = (state = { token: {}, balance: 0 }, action) => {
  switch (action.type) {
    case 'UPDATE_BALANCE_SUCCESS':
      return { ...state, balance: action.balance };
    default:
      return state;
  }
};

export default token;
