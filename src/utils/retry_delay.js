var delay = require('timeout-as-promise');

const DEFAULT_RETRY_TIME = 200;
const DEFAULT_RETRIES = 200;


const retry_delay = (predicate, retry_time = DEFAULT_RETRY_TIME, retires = DEFAULT_RETRIES) => {
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

export default retry_delay;