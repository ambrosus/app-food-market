import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux'
import { initializeBlockchain } from '../actions/InitializeAction.js';
import transactionsStatus from './TransactionsStatusReducer.js';
import {initWeb3, initAmbrosus} from './InitializeReducer.js';
import offers from './OffersReducer.js';
import address from './ContractsReducer.js';

const store = createStore(combineReducers({
        transactionsStatus,
        web3: initWeb3,
        ambrosus: initAmbrosus,
        offers,
        address
    }),
    applyMiddleware(thunkMiddleware));

store.dispatch(initializeBlockchain());

window.store = store;


export default store;