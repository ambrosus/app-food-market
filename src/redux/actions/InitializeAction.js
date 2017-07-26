import { retry_delay } from '../../utils/retry_delay.js';
import Ambrosus from 'ambrosus';

window.Ambrosus3 = Ambrosus;

const WEB3_RETRY_TIME = 200;
const WEB3_RETRIES = 200;

export function initializeBlockchain() {
  return function (dispatch) {
    
    return retry_delay(() => (typeof web3 === 'undefined'), WEB3_RETRY_TIME, WEB3_RETRIES)
      .then(() => {
          return dispatch({ type: 'INIT_AMBROSUS' });
        }
      )
  }
}
