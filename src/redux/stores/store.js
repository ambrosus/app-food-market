import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { initializeBlockchain } from '../actions/InitializeAction.js';
import transactions from '../reducers/TransactionsStatusReducer.js';
import modal from '../reducers/ModalReducer';
import { ambrosus, initWeb3 } from '../reducers/InitializeReducer.js';
import market from '../reducers/MarketReducer.js';
import offer from '../reducers/OfferReducer.js';
import token from '../reducers/TokenReducer.js';
import statements from '../reducers/StatementsReducer.js';
import requirementsAttributes from '../reducers/RequirementsAttributesReducer.js';
import { autoRehydrate, persistStore } from 'redux-persist';

const CATEGORIES = ['Arabica', 'Robusta', 'Hybrids'];
const categories = (state = CATEGORIES, action) => state;

const BREADCRUMBS = {
  '/': { name: 'Ambrosus' },
  '/market': { name: 'Market', parent: '/' },
  '/profile': { name: 'Profile', parent: '/' },
  '/orders': { name: 'My orders', parent: '/' },
  '/product-info': { name: 'Order summary', parent: '/orders' },
  '/approved': { name: 'Order status', parent: '/orders' },
  '/product-buy': { name: 'Product info', parent: '/market' },
  '/create-offer': { name: 'Create offer', parent: '/market' },
  '/create-requirements': { name: 'Create requirements', parent: '/profile' },
  '/create-measurements': { name: 'Create measurements', parent: '/product-buy' },
  '/create-statements': { name: 'Create statements', parent: '/product-info' },
};

const breadcrumbs = (state = BREADCRUMBS, action) => state;

const store = createStore(combineReducers({
    ambrosus,
    transactions,
    requirementsAttributes,
    market,
    modal,
    offer,
    categories,
    token,
    breadcrumbs,
    statements,
  }),

  compose(applyMiddleware(thunk), autoRehydrate(),
    window.devToolsExtension ? window.devToolsExtension({ shouldHotReload: false }) : f => f,
  ));

persistStore(store, { blacklist: ['modal', 'breadcrumbs'] });
store.dispatch(initializeBlockchain());

export default store;
