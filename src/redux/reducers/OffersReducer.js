const offers = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_OFFERS_REQUEST':
    case 'CREATE_MARKET_REQUEST':
      return 'Loading...';
    case 'RECEIVE_OFFERS':
      return action.offers;
    case 'CREATE_MARKET_RESPONSE':
      return 'Market address: ' + action.address
    default:
      return state;
  }
};

export default offers;