import Ambrosus from 'ambrosus';
import { MAX_TRADES_AMOUNT } from '../../constants';
import contractClient from '../../utils/contractClient';
import { promisify } from '../../utils/utils';
import { showModal, hideModal } from '../actions/ModalAction';
import api from '../../api';

export const fetchTrades = () => async function (dispatch, getState) {
  const { paginationPage, offers : assets } = getState().market;
  try {
    const response = await getTradesList(MAX_TRADES_AMOUNT, paginationPage);
    if (response.status) {
      const trades = response.data.map(trade => {
        const tradeAsset = assets.find(asset => asset.address === trade.assetAddress) || {};
        return { ...trade, ...tradeAsset, quantity: 1 };
      });
      dispatch({ type: 'FETCH_TRADES_SUCCESS', trades, tradesAmount: response.meta.totalCount });
    }
  } catch (err) {
    dispatch(showModal('ErrorModal', { reason: err }));
  }
};

const getTradeData = index => {
  const contract = contractClient.getInstance();
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
      const [customer, assetAddress, status] = await getTradeData(id);
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

export async function finishTrade(tradeId, assetId) {
  const [user] = web3.eth.accounts;
  const response = await api.events.createEvent(assetId, 'finishTrade', user);
  if (!tradeId || !response) return;
  await contractClient.run('finishTrade', tradeId, { from: user });
  localStorage.clear();
};

export const loadTradeInfo = () => async (dispatch, getStore) => {
  const { offer } = getStore();
  const tradeId = offer.id;
  if (!tradeId) {
    dispatch(showModal('ErrorModal', { reason: 'Trade id is undefined' }));
    return;
  }

  const contract = contractClient.getInstance();

  const PermissionEvent = contract.Permission({ tradeId }, { fromBlock: 0, toBlock: 'latest' });
  const permissionEventList = await promisify(PermissionEvent, 'get') || [];
  const participantsList = permissionEventList.map(per => per.args.participantAddr);
  const participants = [...new Set(participantsList)];                          // delete duplicates

  const LinkTradeEvent1 = contract.linkedTrade({ tradeId }, { fromBlock: 0, toBlock: 'latest' });
  const LinkTradeEvent2 = contract.linkedTrade({ linkedTradeId: tradeId }, { fromBlock: 0, toBlock: 'latest' });
  const linkTradeEventList1 = await promisify(LinkTradeEvent1, 'get') || [];
  const linkTradeEventList2 = await promisify(LinkTradeEvent2, 'get') || [];
  const linkedTrades1 = linkTradeEventList1.map(event => event.args.linkedTradeId.valueOf());
  const linkedTrades2 = linkTradeEventList2.map(event => event.args.tradeId.valueOf());
  const linkedTrades = [...new Set([...linkedTrades1, ...linkedTrades2])];   // delete duplicates

  if (offer.participants.length !== participants.length || offer.linkedTrades.length !== linkedTrades.length) {
    dispatch({ type: 'FETCH_TRADE_INFO_SUCCESS', participants, linkedTrades });
  }
};

export const linkTrade = (tradeId, linkedTradeId) => async function (dispatch) {
  if (!tradeId || !linkedTradeId) {
    dispatch(showModal('ErrorModal', { reason: 'Trade id is undefined' }));
    return;
  }

  dispatch(showModal('TransactionProgressModal', { title: 'Transaction approval' }));
  const [user] = web3.eth.accounts;
  const contract = contractClient.getInstance();
  const transactionParams = { from: user, gas: 300000, };
  await contractClient.run('linkTrade', tradeId, linkedTradeId, transactionParams);
  dispatch(hideModal());
};

export const setActiveTrade = tradeId => async function (dispatch, getState) {
  const { market } = getState();
  const tradeData = market.trades.find(trade => trade.id === tradeId);
  if (tradeData) {
    dispatch({ type: 'SELECT_OFFER', offer: tradeData });
  } else {
    const [customer, assetAddress, status] = await getTradeData(tradeId);
    const assetData = market.offers.find(offer => offer.address === assetAddress) || {};
    dispatch({ type: 'SELECT_OFFER', offer: { id: tradeId, customer, assetAddress, status, ...assetData } });
  }
};
