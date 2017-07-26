const market = (state = {offers: [], address: '', status: 'No market'}, action) => {
  switch (action.type) {
    case 'FETCH_OFFERS_REQUEST':
      return {...state, status: 'Loading...'};
    case 'CREATE_MARKET_REQUEST':
      return {...state, status: 'Creating market...'};
    case 'FETCH_OFFERS_RESPONSE':
      return {...state, offers: action.offers, status: null};
    case 'CREATE_MARKET_RESPONSE':
      return {...state, address: action.address, status: 'Market address: ' + action.address};
    default:
      return state;
  }
};

export default market;