import { combineReducers } from 'redux'; 
import transactionsStatus from './TransactionsStatusReducer.js';
import offers from './OffersReducer.js';

const marketReducer = combineReducers({
    transactionsStatus,
    offers
});

export default marketReducer;