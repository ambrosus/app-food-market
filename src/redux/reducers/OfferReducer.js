const offer = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_OFFER':
      return action.offer;
    default:
      return state;
  }
};

export default offer;
