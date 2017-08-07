import {connect} from 'react-redux';
import TransactionsStatus from '../../stateless/specific/transactions/TransactionsStatus/TransactionsStatus';

const mapStateToProps = (state, ownProps) => {
    console.log('state', state);
    return {
        notifications: state.transactions.list
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            console.log('onClick');
        }
    }
};

const EthereumTransactionList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionsStatus);

export default EthereumTransactionList;