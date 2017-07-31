const modal = (defaultState = {visible: true}, action) => {
    switch (action.type) {
        case 'MODAL_CANCEL':
            return {visible: false};
        case 'MODAL_CONFIRM':
            return {visible: false};
    }
    return defaultState;
};

export default modal;