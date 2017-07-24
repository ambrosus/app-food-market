const offers = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_OFFERS':
      return state.offers;
    default:
      return state;
  }
};

export default offers;