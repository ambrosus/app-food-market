import { waitForWeb3 } from '../../utils/waitForWeb3';

export function initializeBlockchain() {
  return async function (dispatch) {
    await waitForWeb3();
    return dispatch({ type: 'INIT_AMBROSUS' });      
  }
}
