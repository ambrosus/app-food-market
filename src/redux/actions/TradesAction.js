import { getTrades } from './../../utils/blockchainEvents';
import { CONTRACT_ADDRESS, MAX_TRADES_AMOUNT } from './../../constants';

export const fetchTrades = () => async function (dispatch, getState) {
  const { paginationPage } = getState().market;
  try {
    const response = await getTrades(web3, CONTRACT_ADDRESS, MAX_TRADES_AMOUNT, paginationPage);
    // dispatch({ type: 'FETCH_TRADES_SUCCESS', orders, ordersAmount: TRADES_LIST.length });
  } catch (err) {
    console.warn('FETCH_TRADES_FAILED', err);
  }
};
