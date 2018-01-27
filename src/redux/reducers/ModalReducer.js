const modal = (defaultState = {}, action) => {
    switch (action.type) {
    case 'MODAL_SHOW':
      return { name: action.name, args: action.args };
    case 'MODAL_HIDE':
      return {};
    case 'CLEAR_STATEMENTS':
      return {};
  }
    return defaultState;
  };

export default modal;
