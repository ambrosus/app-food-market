import { connect } from 'react-redux';
import { executeEthereumTransaction } from '../../../redux/actions/TransactionAction.js';
import TransactionsStatus from '../../stateless/TransactionsStatus/TransactionsStatus.jsx';
const promisify = require("es6-promisify");

const mapStateToProps = (state, ownProps) => {
    return state["transactionsStatus"];
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
			const promisifedSendTransaction = promisify(web3.eth.sendTransaction)      
			var args = {to: web3.eth.defaultAccount, value: 1000};
			dispatch(executeEthereumTransaction(promisifedSendTransaction(args), "Test transaction", "url"));
        }
    }
}

const EthereumTransactionsStatus = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionsStatus)

export default EthereumTransactionsStatus;
