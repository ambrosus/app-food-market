var delay = require('timeout-as-promise');

const WEB3_LOAD_TIMEOUT = 1000;

export const initWeb3 = () => {
    return { type: 'INIT_WEB3' };
};

export function waitForWeb3() {
  return function (dispatch) {
    return delay(WEB3_LOAD_TIMEOUT)
      .then(json =>
        dispatch(initWeb3())
      )
  }
}
