import Ambrosus from 'ambrosus';
import abi from './abi.json';
import { CONTRACT_ADDRESS, MAX_TRADES_AMOUNT } from './../../constants';

export const fetchTrades = () => async function (dispatch, getState) {
  const { paginationPage, offers : assets } = getState().market;
  try {
    const response = await getTrades(CONTRACT_ADDRESS, MAX_TRADES_AMOUNT, paginationPage);
    if (response.status) {
      const trades = response.data.map(trade => {
        const tradeAsset = assets.find(asset => asset.address === trade.assetAddress) || {};
        return { ...trade, ...tradeAsset, quantity: 1 };
      });
      dispatch({ type: 'FETCH_TRADES_SUCCESS', trades, tradesAmount: response.meta.totalCount });
    }
  } catch (err) {
    console.warn('FETCH_TRADES_FAILED', err);
  }
};

const getTradesCount = async (contract) => {
  return new Promise(function (resolve, reject) {
    contract.getTradesCount((err, res) => {
      if (err) reject(null);
      else resolve(+res.valueOf());
    });
  });
};

const getTradeData = async (contract, index) => {
  return new Promise(function (resolve, reject) {
    contract.trades.call(index, (err, res) => {
      if (err) reject(null);
      else resolve(res);
    });
  });
};

const getTradesList = async (event, user) => {
  return new Promise(function (resolve, reject) {
    event.get((err, res) => {
      if (err) reject([]);
      else resolve(res
        .filter(resItem => resItem.event === 'Permission' && resItem.args.participantAddr === user)
        .map(restItem => ({ id: restItem.args.tradeId })));
    });
  });
};

async function getTrades(contractAddress, limit, offset) {
  const MyContract = web3.eth.contract(abi);
  const contract = await MyContract.at(contractAddress);
  const totalCount = await getTradesCount(contract);
  if (!totalCount) return { status: 0 };
  const [user] = web3.eth.accounts;
  const event = contract.allEvents({ fromBlock: 0, toBlock: 'latest' });
  const tradesList = await getTradesList(event, user);
  const list = await Promise.all(tradesList.map(async trade => {
    const tradeData = await getTradeData(contract, trade.id);
    if (!trade) return;
    return {
      id: trade.id.valueOf(),
      customer: tradeData[0],
      assetAddress: tradeData[1],
      status: tradeData[2],
    };
  }));

  return {
    status: 1,
    data: list.slice(limit * offset, (offset + 1) * limit),
    meta: {
      totalCount: list.length,
    },
  };
};

export async function finishTrade(tradeId) {
  const [user] = web3.eth.accounts;
  const MyContract = web3.eth.contract(abi);
  const contract = await MyContract.at(CONTRACT_ADDRESS);
  await contract.finishTrade(tradeId, { from: user }, (err, res) => {
    if (!err) console.log('Trade has been finished.', res);
    else console.warn('Trade hasn`t been finished. Error: ', err);
  });
  localStorage.clear();
};
