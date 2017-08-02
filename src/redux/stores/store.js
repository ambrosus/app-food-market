import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {initializeBlockchain} from '../actions/InitializeAction.js';
import transactionsStatus from '../reducers/TransactionsStatusReducer.js';
import modal from '../reducers/ModalReducer';
import {ambrosus, initWeb3} from '../reducers/InitializeReducer.js';
import market from '../reducers/MarketReducer.js';
import offer from '../reducers/OfferReducer.js';


const CATEGORIES = ["All", "Anchovies", "Markel", "Salmon", "Tuna", "Other"];
const categories = (state = CATEGORIES, action) => {
    return state;
};

const store = createStore(combineReducers({
        transactionsStatus,
        ambrosus,
        market,
        modal,
        offer,
        categories
    }),
    compose(applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

store.dispatch(initializeBlockchain());

export default store;