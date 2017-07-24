import { connect } from 'react-redux';
import { statusAddPendingTransaction } from '../../../redux/actions/Action.js';
import TransactionsStatus from '../../stateless/TransactionsStatus/TransactionsStatus.jsx';

const mapStateToProps = (state, ownProps) => {
    return state["transactionsStatus"];
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(statusAddPendingTransaction("0x", "Adding item", "/dupa"));
        }
    }
}

const EthereumTransactionsStatus = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionsStatus)

export default EthereumTransactionsStatus;
