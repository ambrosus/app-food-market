import { waitForWeb3 } from '../../utils/wait_for_web3.js';
import Ambrosus from 'ambrosus';

const WEB3_RETRY_TIME = 200;
const WEB3_RETRIES = 200;

export function initializeBlockchain() {
  return function (dispatch) {
    await waitForWeb3();
    return dispatch({ type: 'INIT_AMBROSUS' });      
  }
}
