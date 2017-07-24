import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux'
import { waitForWeb3 } from '../actions/InitalisationAction.js';
import transactionsStatus from './TransactionsStatusReducer.js';
import web3Status from './web3Status.js';

const store = createStore(combineReducers({
        transactionsStatus,
        web3Status
    }),
    applyMiddleware(thunkMiddleware));

store.dispatch(waitForWeb3());

window.store = store;

export default store;