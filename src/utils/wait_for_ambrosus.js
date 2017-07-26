import { retry_delay } from './retry_delay.js';
import Ambrosus from 'ambrosus';

export const wait_for_ambrosus = async () => {
  await retry_delay(() => typeof Ambrosus.MarketContract.currentProvider == 'undefined' || web3.eth.accounts.length==0);
};