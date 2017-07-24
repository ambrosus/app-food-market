import { connect } from 'react-redux';
import { sendTransaction } from '../../../redux/actions/Action.js';
import TransactionsStatus from '../../stateless/TransactionsStatus/TransactionsStatus.jsx';

const mapStateToProps = (state, ownProps) => {
    return state["transactionsStatus"];
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(sendTransaction(web3.eth.defaultAccount, 1000));
        }
    }
}

const EthereumTransactionsStatus = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionsStatus)

export default EthereumTransactionsStatus;
