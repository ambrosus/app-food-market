import { connect } from 'react-redux';
import TransactionList from '../../stateless/specific/TransactionList/TransactionList';

const mapStateToProps = (state, ownProps) => {
    return state["transactionsStatus"];
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

const EthereumTransactionList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionList);

export default EthereumTransactionList;
