const defaultState = {
  pricePerUnit: 0,
  pricePerPackage: 0,
  packageWeight: 0,
  category: '',
  status: '',
  seller: '',
  name: '',
  participants: [],
  statements: [],
  linkedTrades: [],
};

const offer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SELECT_OFFER':
      return { ...state, ...action.offer, participants: [], statements: [], linkedTrades: [], };
    case 'RESET_SELECTED':
      return defaultState;
    case 'FETCH_MEASUREMENTS_SUCCESS':
      return { ...state, measurements: action.measurements };
    case 'FETCH_TRADE_INFO_SUCCESS':
      return { ...state, participants: action.participants, linkedTrades: action.linkedTrades };
    case 'FETCH_STATEMENTS_SUCCESS':
      return { ...state, statements: action.statements };
    case 'CREATE_STATEMENT_SUCCESS':
      return { ...state, statements: action.statements };
    case 'CLEAR_OFFER':
      return { ...defaultState };
    default:
      return state;
  }
};

export default offer;
