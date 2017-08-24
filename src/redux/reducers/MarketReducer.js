const DEFAULT_STATE = {
  offers: [],
  status: 'No market',
  address: '',
  requirements: [],
  orders: [],
  username: '',
};

const market = (
  state = DEFAULT_STATE,
  action) => {
  switch (action.type) {
    case 'FETCH_OFFERS_REQUEST':
      return { ...state, status: 'Loading' };
    case 'FETCH_OFFERS_RESPONSE':
      return { ...state, offers: action.offers, status: null };
    case 'FETCH_REQUIREMENT_RESPONSE':
      return { ...state, requirements: action.requirements };
    case 'CREATE_MARKET_REQUEST':
      return { ...state, status: 'About to create market...' };
    case 'CREATE_MARKET_RESPONSE':
      return { ...state, status: 'Loading' };
    case 'CREATE_MARKET_SUCCESS':
      return { ...state, address: action.address, status: 'Market address: ' + action.address };
    case 'CREATE_MARKET_FAILED':
      return { ...state, status: 'Unable to create market' };
    case 'FILTER_UPDATE':
      return { ...state, filter: { ...state.filter, [action.key]: action.value } };
    case 'FILTER_RESET':
      return { ...state, filter: {} };
    case 'FETCH_AGREEMENTS_SUCCESS':
      return { ...state, orders: action.agreements };
    case 'FETCH_USERNAME_SUCCESS':
      return { ...state, username: action.username };
    default:
      return state;
  }
};

export default market;
