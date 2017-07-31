import { retry_delay } from './retry_delay.js';

export const waitForWeb3 = async () => {
  await retry_delay(() => typeof web3 == 'undefined');
};