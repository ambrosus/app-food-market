import { waitForWeb3 } from '../../utils/waitForWeb3';
import { showModal } from './ModalAction.js';

export function initializeBlockchain() {
  return async function (dispatch) {
    try {
      await waitForWeb3();
      return dispatch({ type: 'INIT_AMBROSUS' });
    } catch (reason) {
      const args = { reason: '', title: 'Web3 no found', message: 'You need to run this application in Ethereum browser. Install parity or metamask and come back.' };
      dispatch(showModal('ErrorModal', args));
    }

  };
}
