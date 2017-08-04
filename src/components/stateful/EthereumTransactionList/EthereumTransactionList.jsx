import {connect} from 'react-redux';
import TransactionStatus from '../../stateless/specific/transactions/TransactionsStatus/TransactionsStatus';

const mapStateToProps = (state, ownProps) => {
    console.log('state', state);
    return {
        notifications: state.transactions.list
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

const EthereumTransactionList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionStatus);

export default EthereumTransactionList;