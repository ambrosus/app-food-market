import {connect} from 'react-redux';
import {executeEthereumTransaction} from '../../../redux/actions/TransactionAction.js';
import TransactionsStatus from '../../stateless/specific/transactions/TransactionsStatus/TransactionsStatus';
const promisify = require("es6-promisify");

const mapStateToProps = (state, ownProps) => {
    return state["transactionsStatus"];
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            console.log('onClick');
            const promisifedSendTransaction = promisify(web3.eth.sendTransaction);
            let args = {to: web3.eth.defaultAccount, value: 1000};
            dispatch(executeEthereumTransaction(promisifedSendTransaction(args), "Test transaction", "url"));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsStatus);