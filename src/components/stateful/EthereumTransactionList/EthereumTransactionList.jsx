import { connect } from 'react-redux';
import TransactionList from '../../stateless/TransactionList/TransactionList.jsx';

const mapStateToProps = (state, ownProps) => {
    return state["transactionsStatus"];
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

const EthereumTransactionList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionList)

export default EthereumTransactionList;
