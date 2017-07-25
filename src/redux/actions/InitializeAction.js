var delay = require('timeout-as-promise');

const WEB3_RETRY_TIME = 200;
const WEB3_RETRIES = 200;

export const retry_delay = (predicate, retry_time = WEB3_RETRY_TIME, retires = WEB3_RETRIES) => {
  return new Promise(async (resolve, reject)=>{
    var i=0;
    while (i < retires && predicate()){
      await delay(retry_time);
      i++;
    }
    if (i==retires){      
      reject();
    }
    resolve();
  });
}; 

export function initializeBlockchain() {
  return function (dispatch) {
    return retry_delay(() => typeof web3 === 'undefined', WEB3_RETRY_TIME, WEB3_RETRIES)
      .then(() =>
        dispatch({ type: 'INIT_WEB3' })        
      ).then(() => {  
          global.Ambrosus.setProvider(web3.currentProvider);

          return dispatch({ type: 'INIT_AMBROSUS' })
        }
      )
  }
}
