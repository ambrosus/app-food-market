var delay = require('timeout-as-promise');

const WEB3_LOAD_TIMEOUT = 1000;

export function initializeBlockchain() {
  return function (dispatch) {
    return delay(WEB3_LOAD_TIMEOUT)
      .then(json =>
        dispatch({ type: 'INIT_WEB3' })        
      ).then(json =>
        dispatch({ type: 'INIT_AMBROSUS' })
      )
  }
}
