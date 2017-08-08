import Ambrosus from 'ambrosus';
import { showModal, hideModal } from './ModalAction.js';
import { statusAddPendingTransaction, statusAddSuccessTransaction, statusAddFailedTransaction } from './TransactionStatusAction.js';



export const createToken = (amount) => {  
  return async function(dispatch) {
    var tokenCreator = new Ambrosus.TokenSingleton();

    tokenCreator.create([web3.eth.accounts[0]], [amount], (transactionHash) => {
      dispatch(statusAddPendingTransaction(transactionHash, "Creating token", ""));
      dispatch(showModal("TransactionProgressModal", {title: "Creating token"}));
    }).then((token) => {
      dispatch(statusAddSuccessTransaction(token.contract.transactionHash, "Creating token", ""));
      dispatch({type: 'CREATE_TOKEN_SUCCESS', token});
      dispatch(updateBalance(token));
      dispatch(hideModal());
    }).catch((reason) => {
      dispatch(showModal("ErrorModal", { reason }));      
    })
  }
}

export const updateBalance = (token) => {
  return async function(dispatch) {
    var balance = await token.balanceOf();
    dispatch({type: 'UPDATE_BALANCE_SUCCESS', balance});
  }
}