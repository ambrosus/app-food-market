const attributes = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ATTRIBUTES_SUCCESS':
      return action.attributes;
    default:
      return state;
  }
};

export default attributes;
