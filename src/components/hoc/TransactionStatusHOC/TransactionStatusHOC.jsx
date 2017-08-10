import { connect } from 'react-redux';
import { executeEthereumTransaction } from '../../../redux/actions/TransactionAction.js';
import TransactionsStatus from '../../stateless/specific/transactions/TransactionsStatus/TransactionsStatus';
const promisify = require('es6-promisify');

const mapStateToProps = (state, ownProps) => ({
    notifications: state.transactions.list,
    stats: state.transactions.stats,
  });

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
      const promisifedSendTransaction = promisify(web3.eth.sendTransaction);
      let args = { to: web3.eth.defaultAccount, value: 1000 };
      dispatch(executeEthereumTransaction(promisifedSendTransaction(args), 'Test transaction', 'url'));
    },
});

const TransactionStatusHOC = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionsStatus);

export default TransactionStatusHOC;
