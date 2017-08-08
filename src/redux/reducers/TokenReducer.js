const token = (state = {token: null, balance: 0}, action) => {
  switch (action.type) {
    case 'CREATE_TOKEN_SUCCESS':
      return {token: action.token, balance: 0};
    case 'UPDATE_BALANCE_SUCCESS':
      return {...state, balance: action.balance};
    default:
      return state;
  }
};

export default token;