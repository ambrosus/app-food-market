import { connect } from 'react-redux';
import TransactionsStatus from '../stateless/specific/transactions/TransactionsStatus/TransactionsStatus';

const mapStateToProps = (state, ownProps) => ({
  notifications: state.transactions.list,
  stats: state.transactions.stats,
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

const TransactionStatusHOC = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionsStatus);

export default TransactionStatusHOC;
