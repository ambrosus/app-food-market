const offers = (state = [], action) => {
  switch (action.type) {
    case 'REQUEST_OFFERS':
      return 'Loading...';
    case 'RECEIVE_OFFERS':
      return action.offers;
    case 'NEW_ADDRESS':
      return 'Market address: ' + action.address
    default:
      return state;
  }
};

export default offers;