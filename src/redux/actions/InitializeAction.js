import { waitForWeb3 } from '../../utils/wait_for_web3.js';
import Ambrosus from 'ambrosus';

window.Ambrosus = Ambrosus;

const WEB3_RETRY_TIME = 200;
const WEB3_RETRIES = 200;

export function initializeBlockchain() {
  return function (dispatch) {
    return waitForWeb3()
      .then(() => {
          return dispatch({ type: 'INIT_AMBROSUS' });
        }
      )
  }
}
