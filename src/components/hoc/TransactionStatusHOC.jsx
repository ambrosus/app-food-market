import { connect } from 'react-redux';
import TransactionsStatus from '../stateless/specific/transactions/TransactionsStatus/TransactionsStatus';
import { readAll, readNotification } from '../../redux/actions/TransactionStatusAction';
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => ({
  notifications: _.sortBy(state.transactions.list, (trans) => -trans.time),
  stats: state.transactions.stats,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  markAsRead: (address) => dispatch(readNotification(address)),
  readAll: () => dispatch(readAll()),
});

const TransactionStatusHOC = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionsStatus);

export default TransactionStatusHOC;
