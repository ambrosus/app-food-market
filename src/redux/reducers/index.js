import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux'
import { waitForWeb3 } from '../actions/Action.js';
import transactionsStatus from './TransactionsStatusReducer.js';
import web3Status from './web3Status.js';
import offers from './OffersReducer.js';

const store = createStore(combineReducers({
        transactionsStatus,
        offers,
        web3Status
    }),
    applyMiddleware(thunkMiddleware));

store.dispatch(waitForWeb3());

window.store = store;

export default store;