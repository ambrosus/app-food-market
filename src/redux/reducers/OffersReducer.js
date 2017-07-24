const offers = (state = [], action) => {
  switch (action.type) {
    case 'REQUEST_OFFERS':
      return [{name: 'Loading...'}]
    case 'RECEIVE_OFFERS':
      return state.offers;
    default:
      return state;
  }
};

export default offers;