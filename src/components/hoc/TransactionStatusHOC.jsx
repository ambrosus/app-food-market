import { connect } from 'react-redux';
import { executeEthereumTransaction } from '../../redux/actions/TransactionAction.js';
import TransactionsStatus from '../stateless/specific/transactions/TransactionsStatus/TransactionsStatus';
const promisify = require('es6-promisify');

const mapStateToProps = (state, ownProps) => ({
  notifications: state.transactions.list,
  stats: state.transactions.stats,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

const TransactionStatusHOC = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionsStatus);

export default TransactionStatusHOC;
