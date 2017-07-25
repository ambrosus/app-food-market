const market = (state = {offers: [], address: ''}, action) => {
  switch (action.type) {
    case 'FETCH_OFFERS_REQUEST':
    case 'CREATE_MARKET_REQUEST':
      return {...state, offers: 'Loading...'};
    case 'RECEIVE_OFFERS':
      return {...state, offers: action.offers};
    case 'CREATE_MARKET_RESPONSE':
      return {...state, address: action.address, offers: 'Market address: ' + action.address};
    default:
      return state;
  }
};

export default market;