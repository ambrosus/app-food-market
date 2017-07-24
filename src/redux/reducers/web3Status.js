

const doInitWeb3 = () => {
    if (typeof web3 !== 'undefined') {
        return window.web3 = new Web3(web3.currentProvider);
    }
}


const web3Status = (state = {init: false}, action) => {
    switch (action.type) {
        case 'INIT_WEB3':
            var web3Handle = doInitWeb3();
            return {init: typeof web3Handle !== 'undefined', web3: web3Handle};
        default:
            return state;
    }
};

export default web3Status;
