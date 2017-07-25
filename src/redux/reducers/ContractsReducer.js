const address = (state = '', action) => {
  switch (action.type) {
    case 'NEW_ADDRESS':
      return action.address;
    default:
      return state;
  }
}

export default address;