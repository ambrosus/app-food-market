const DEFAULT_STATE = {
  offers: [],
  status: 'No market',
  address: '',
  requirements: [],
  trades: [],
  devices: [
    '0x123f681646d4a755815f9cb19e1acc8565a0c2ac',
    '0xe99356bde974bbe08721d77712168fa070aa8da4',
    '0xc2d7cf95645d33006175b78989035c7c9061d3f9',
  ], // Example devices for demo purposes
  username: '',
  tradesAmount: 0,
  offersAmount: 0,
  paginationPage: 0,
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
    case 'FETCH_TRADES_SUCCESS':
      return { ...state, trades: action.trades, tradesAmount: action.tradesAmount };
    case 'SET_MARKET':
      return state.address === action.address
        ? state
        : {
          ...DEFAULT_STATE,
          username: state.username,
          address: action.address,
        };
    case 'CREATE_MARKET_REQUEST':
      return { ...DEFAULT_STATE, username: state.username, status: 'About to create market...' };
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
    case 'FETCH_USERNAME_SUCCESS':
      return { ...state, username: action.username };
    case 'SET_MEASUREMENTS_FORM':
      return { ...state, measurementsForm: action.form };
    case 'RESET_MEASUREMENTS_FORM':
      return { ...state, measurementsForm: null };
    case 'SET_PAGINATION_PAGE':
      return { ...state, paginationPage: action.paginationPage };
    default:
      return state;
  }
};

export default market;
