import Ambrosus from 'ambrosus';

const doInitWeb3 = () => {
    if (typeof web3 !== 'undefined') {
      return window.web3 = new Web3(web3.currentProvider);
    }
  };

export const ambrosus = (state = null, action) => {
    switch (action.type) {
    case 'INIT_AMBROSUS':

      //doInitWeb3();
      Ambrosus.setProvider(web3.currentProvider);
      return Ambrosus;
    default:
      return state;
  }
  };

