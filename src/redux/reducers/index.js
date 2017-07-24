import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux'
import { connectToWeb3 } from '../actions/Action.js';
import getAllOffers from '../actions/MarketAction.js';
import transactionsStatus from './TransactionsStatusReducer.js';
import web3Status from './web3Status.js';
import offers from './OffersReducer.js';

const store = createStore(combineReducers({
        transactionsStatus,
        offers,
        web3Status
    }),
    applyMiddleware(thunkMiddleware));

store.dispatch(connectToWeb3());

window.store = store;

export default store;