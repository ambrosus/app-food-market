const modal = (defaultState = null, action) => {	
    switch (action.type) {
        case 'MODAL_SHOW':
            return action.name;
        case 'MODAL_HIDE':
            return null;
    }
    return defaultState;
};

export default modal;