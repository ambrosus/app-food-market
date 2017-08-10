import { retryDelay } from './retryDelay';

export const waitForWeb3 = async () => {
  await retryDelay(() => typeof web3 === 'undefined', 500, 6);
};
