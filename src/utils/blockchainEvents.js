const abi = require('./abi.json');
const WEB3_WAIT_TIME = 500;
const WEB3_RETRIES = 20;

const TRANSACTION_WAIT_TIME = 1000;
const TRANSACTION_RETRIES = 1200; //20 MIN

export const transactionMined = (tx, waitTime = TRANSACTION_WAIT_TIME, maxRetries = TRANSACTION_RETRIES) => {
  let retries = 0;
  return new Promise((resolve, reject) => {
    web3.eth.getTransaction(tx, function (error, transaction) {
      if (error) {
        reject(error);
      } else if (transaction.blockHash) {
        resolve(transaction);
      } else if (retries >= maxRetries) {
        let timeout = waitTime * maxRetries / 1000;
        reject(`Transaction ${tx} timeouted after ${timeout}`);
      } else {
        retries++;
        setTimeout(() => transactionMined(tx, dispatch), TRANSACTION_WAIT_TIME);
      }
    });
  });
};

export const hasWeb3 = () => web3.eth.accounts.length > 0;

export async function getTrades(provider, contractAddress, limit, offset) {
  let contract = new provider.eth.Contract(abi, contractAddress);
  let trades = [];

  let i;
  let error = false;
  let totalCount;

  try {
    totalCount = await contract.methods.getTradesCount().call();
  } catch (error) {
    return {
      status: 0,
    };
  }

  for (i = 0; (i < limit) && (offset + i < totalCount); ++i) {
    try {
      let trade = await contract.methods.trades(offset + i).call();
      trades.push({
        seller: trade['creator'],
        status: (trade['done'] ? 'finished' : 'not_finished'),
        asset_id: trade['assetID'],
      });
    } catch (error) {
      return {
        status: 0,
      };
    }
  }

  return {
    status: 1,
    data: trades,
    meta: {
      totalCount: totalCount,
      filteredCount: i,
    },
  };
};

export async function finishTrade (provider, contractAddress, currentUser, tradeId) {
  let contract = new provider.eth.Contract(abi, contractAddress);
  await contract.methods.finishTrade(tradeId).send({ from: currentUser });
};

