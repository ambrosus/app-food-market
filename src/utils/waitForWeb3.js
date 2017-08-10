import { retry_delay } from './retryDelay';

export const waitForWeb3 = async () => {
  await retry_delay(() => typeof web3 === 'undefined', 500, 6);
};
