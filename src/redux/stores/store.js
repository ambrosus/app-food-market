import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { initializeBlockchain } from '../actions/InitializeAction.js';
import transactions from '../reducers/TransactionsStatusReducer.js';
import modal from '../reducers/ModalReducer';
import { ambrosus, initWeb3 } from '../reducers/InitializeReducer.js';
import market from '../reducers/MarketReducer.js';
import offer from '../reducers/OfferReducer.js';
import token from '../reducers/TokenReducer.js';
import requirementsAttributes from '../reducers/RequirementsAttributesReducer.js';

const CATEGORIES = ['Anchovies', 'Markel', 'Salmon', 'Tuna'];
const categories = (state = CATEGORIES, action) => state;

const store = createStore(combineReducers({
        ambrosus,
        transactions,
        requirementsAttributes,
        market,
        modal,
        offer,
        categories,
        token,
      }),

    compose(applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension({ shouldHotReload: false }) : f => f
    ));

store.dispatch(initializeBlockchain());

export default store;
