const offer = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_OFFER':
      return action.offer;
    case 'RESET_SELECTED':
      return {};
    default:
      return state;
  }
};

export default offer;
