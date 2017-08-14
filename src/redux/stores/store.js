import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { initializeBlockchain } from '../actions/InitializeAction.js';
import transactions from '../reducers/TransactionsStatusReducer.js';
import modal from '../reducers/ModalReducer';
import { ambrosus, initWeb3 } from '../reducers/InitializeReducer.js';
import market from '../reducers/MarketReducer.js';
import offer from '../reducers/OfferReducer.js';
import token from '../reducers/TokenReducer.js';
import attributes from '../reducers/AttributesReducer.js';

const CATEGORIES = ['Anchovies', 'Markel', 'Salmon', 'Tuna', 'Other'];
const categories = (state = CATEGORIES, action) => state;

const store = createStore(combineReducers({
        transactions,
        ambrosus,
        market,
        modal,
        offer,
        categories,
        token,
        attributes,
      }),

    compose(applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

store.dispatch(initializeBlockchain());

export default store;
