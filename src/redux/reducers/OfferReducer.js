const defaultState = {
  pricePerUnit: 0,
  pricePerPackage: 0,
  packageWeight: 0,
  category: '',
  status: '',
  seller: '',
  name: '',
};

const offer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SELECT_OFFER':
      return action.offer;
    case 'RESET_SELECTED':
      return defaultState;
    case 'FETCH_MEASUREMENTS_SUCCESS':
      return { ...state, measurements: action.measurements };
    default:
      return state;
  }
};

export default offer;
