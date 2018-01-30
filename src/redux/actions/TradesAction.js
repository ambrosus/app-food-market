import Ambrosus from 'ambrosus';
import { MAX_TRADES_AMOUNT } from './../../constants';
import contractClient from '../../utils/contractClient';
import { promisify } from '../../utils/utils';

export const fetchTrades = () => async function (dispatch, getState) {
  const { paginationPage, offers : assets } = getState().market;
  try {
    const response = await getTradesList(MAX_TRADES_AMOUNT, paginationPage);
    if (response.status) {
      const trades = response.data.map(trade => {
        const traradesdeAsset = assets.find(asset => asset.address === trade.assetAddress) || {};
        return { ...trade, ...tradeAsset, quantity: 1 };
      });
      dispatch({ type: 'FETCH_TRADES_SUCCESS', trades, tradesAmount: response.meta.totalCount });
    }
  } catch (err) {
    console.warn('FETCH_TRADES_FAILED', err);
  }
};

const getTradeData = async (contract, index) => {
  return new Promise((resolve, reject) => {
    contract.trades.call(index, (err, res) => {
      if (err) reject([]);
      else resolve(res);
    });
  });
};

async function getTradesList(limit, offset) {
  const totalCount = await contractClient.run('getTradesCount');
  if (!totalCount.valueOf()) return { status: 0 };
  const [user] = web3.eth.accounts;
  const contract = contractClient.getInstance();
  const event = contract.Permission({ participantAddr: user, p: 2 }, { fromBlock: 0, toBlock: 'latest' });
  const tradesFromWeb3 = await promisify(event, 'get') || [];
  const list = await Promise.all(tradesFromWeb3
    .slice(limit * offset, (offset + 1) * limit)
    .map(async trade => {
      const id = trade.args.tradeId.valueOf();
      const [customer, assetAddress, status] = await getTradeData(contract, id);
      return { id, customer, assetAddress, status };
    }));

  return {
    status: 1,
    data: list,
    meta: {
      totalCount: tradesFromWeb3.length,
    },
  };
};

export async function finishTrade(tradeId) {
  const [user] = web3.eth.accounts;
  await contractClient.run('finishTrade', tradeId, { from: user });
  localStorage.clear();
};
