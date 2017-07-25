import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux'/*
<<<<<<< HEAD
import { connectToWeb3 } from '../actions/Action.js';
import getAllOffers from '../actions/MarketAction.js';
import transactionsStatus from './TransactionsStatusReducer.js';
import web3Status from './web3Status.js';
import offers from './OffersReducer.js';
import address from './ContractsReducer.js';

const store = createStore(combineReducers({
        transactionsStatus,
        offers,
        address,
        web3Status
    }),
    applyMiddleware(thunkMiddleware));

store.dispatch(connectToWeb3());
=======*/
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
// >>>>>>> d6f9ebccaf6f354013300a2d1f0e0a8b1c492863

export default store;