const DEFAULT_STATE = {
    offers: [],
    address: '',
    status: 'No market',
    filter: {},
    qualities: [],
  };

const market = (state = DEFAULT_STATE,
  action) => {
  switch (action.type) {
    case 'FETCH_OFFERS_REQUEST':
      return { ...state, status: 'Loading' };
    case 'FETCH_OFFERS_RESPONSE':
      return { ...state, offers: action.offers, status: null };
    case 'FETCH_REQUIREMENT_RESPONSE':
      return { ...state, qualities: action.requirements };
    case 'CREATE_MARKET_REQUEST':
      return { ...state, status: 'About to create market...' };
    case 'CREATE_MARKET_RESPONSE':
      return { ...state, status: 'Loading' };
    case 'CREATE_MARKET_SUCCESS':
      return { ...state, address: action.address, status: 'Market address: ' + action.address };
    case 'CREATE_MARKET_FAILED':
      return { ...state, status: 'Unable to create market' };
    case 'GOTO_MARKET':
      return { ...state, address: action.address, offers: [], status: 'Loading', filter: {} };
    case 'FILTER_UPDATE':
      return { ...state, filter: { ...state.filter, [action.key]: action.value } };
    case 'FILTER_RESET':
      return { ...state, filter: {} };
    default:
      return state;
  }
};

export default market;
