var delay = require('timeout-as-promise');

const WEB3_CHECK_TIMEOUT = 200;
const WEB3_MAX_CHECK_TIMES = 20;

export const initWeb3 = () => {
    return { type: 'INIT_WEB3' };
};

export const waitForWeb3 = async () => {
  var i=0;
  while (i < WEB3_MAX_CHECK_TIMES && typeof web3 === 'undefined'){
    await delay(WEB3_CHECK_TIMEOUT);
    i++;
  }
  if (i==WEB3_MAX_CHECK_TIMES){
    console.error('Web3 not available');
    return false;
  }
  return true;
} 

export function connectToWeb3() {
  
  return async function (dispatch) {
    await waitForWeb3();
    return dispatch(initWeb3());      
  }
}
