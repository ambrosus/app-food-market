import thunkMiddleware from 'redux-thunk'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {initializeBlockchain} from '../actions/InitializeAction.js';
import transactionsStatus from './TransactionsStatusReducer.js';
import {initAmbrosus, initWeb3} from './InitializeReducer.js';
import market from './MarketReducer.js';
import offer from './OfferReducer.js';

const store = createStore(combineReducers({
        transactionsStatus,
        ambrosus: initAmbrosus,
        market,
        offer
    }),
    compose(applyMiddleware(thunkMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

store.dispatch(initializeBlockchain());

export default store;