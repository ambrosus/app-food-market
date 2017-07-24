import Ambrosus from 'ambrosus'

const doInitWeb3 = () => {
    if (typeof web3 !== 'undefined') {
        return window.web3 = new Web3(web3.currentProvider);
    }
};

const web3Status = (state = {init: false}, action) => {
    switch (action.type) {
        case 'INIT_WEB3':
            Ambrosus.setProvider(web3.currentProvider);
            var web3Handle = doInitWeb3();
            return {init: typeof web3Handle !== 'undefined', web3: web3Handle, ambrosus: Ambrosus};
        default:
            return state;
    }
};

export default web3Status;
