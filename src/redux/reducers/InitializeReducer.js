import Ambrosus from 'ambrosus'

const doInitWeb3 = () => {
    if (typeof web3 !== 'undefined') {
        return new Web3(web3.currentProvider);
    }
};

export const initWeb3 = (state = {init: false}, action) => {
    switch (action.type) {
        case 'INIT_WEB3':
            return doInitWeb3();
        default:
            return state;
    }
};

export const initAmbrosus = (state = null, action) => {
    switch (action.type) {
        case 'INIT_AMBROSUS':            
            Ambrosus.setProvider(web3.currentProvider);
            return Ambrosus;
        default:
            return state;
    }
};

