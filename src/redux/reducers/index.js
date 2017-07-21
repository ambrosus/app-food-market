import { combineReducers } from 'redux';
import transactionsStatus from './TransactionsStatusReducer.js';

const marketApp = combineReducers({
    transactionsStatus
});

export default marketApp;
