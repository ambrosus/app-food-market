let delay = require('timeout-as-promise');

const DEFAULT_RETRY_TIME = 500;
const DEFAULT_RETRIES = 10;

export const retryDelay = (predicate, retryTime = DEFAULT_RETRY_TIME, retires = DEFAULT_RETRIES) => (new Promise(async (resolve, reject) => {
    let i = 0;
    while (i < retires && predicate()) {
      await delay(retryTime);
      i++;
    }

    if (i === retires) {
      reject();
    }

    resolve();
  }));
