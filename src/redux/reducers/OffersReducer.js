const offers = (state = [], action) => {
  switch (action.type) {
    case 'REQUEST_OFFERS':
      return 'Loading...';
    case 'RECEIVE_OFFERS':
      return action.offers;
    default:
      return state;
  }
};

export default offers;