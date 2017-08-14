const requirementsAttributes = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ATTRIBUTES_SUCCESS':
      return action.attributes;
    case 'RESET_SELECTED':
      return [];
    default:
      return state;
  }
};

export default requirementsAttributes;
