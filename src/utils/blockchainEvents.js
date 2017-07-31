import { retry_delay } from './retry_delay.js';

const WEB3_WAIT_TIME = 500;
const WEB3_RETRIES = 20;

const TRANSACTION_WAIT_TIME = 1000;
const TRANSACTION_RETRIES = 1200; //20 MIN

export const web3Loaded = async () => {
  const predicate = () => typeof web3 !== 'undefined' || web3.eth.accounts.length == 0
  return await retry_delay(predicate, WEB3_WAIT_TIME, WEB3_RETRIES);
}; 

export const transactionMined = (tx, wait_time = TRANSACTION_WAIT_TIME, maxRetries = TRANSACTION_RETRIES) => {
	let retries = 0;
	return new Promise((resolve, reject) => {
		web3.eth.getTransaction(tx, function(error, transaction) {
		  if (error) {
		    reject(error);
		  } else if (transaction.blockHash) {
		  	resolve(transaction);
		  } else if (retries >= maxRetries) {
		  	let timeout = wait_time * maxRetries / 1000;
			reject(`Transaction ${tx} timeouted after ${timeout}`);
		  } else {
		  	retries++;
		    setTimeout(() => transactionMined(tx, dispatch), TRANSACTION_WAIT_TIME);
		  }
		});
	});
}; 

