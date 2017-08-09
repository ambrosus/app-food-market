import { retry_delay } from './retryDelay';
import Ambrosus from 'ambrosus';

export const waitForAmbrosus = async () => {
    await retry_delay(() => typeof Ambrosus.MarketContract.currentProvider === 'undefined' || web3.eth.accounts.length === 0);
  };
