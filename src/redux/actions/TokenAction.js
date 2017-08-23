import Ambrosus from 'ambrosus';
import { waitForAmbrosus } from '../../utils/waitForAmbrosus';
import TransactionBuilder from '../../utils/transactionBuilder';

async function getToken(marketAddress) {
  await waitForAmbrosus();
  let tokenCreator = new Ambrosus.TokenSingleton();
  let market = await new Ambrosus.MarketRepository().fromAddress(marketAddress);
  let tokenAddress = await market.getTokenAddress();
  return tokenCreator.fromAddress(tokenAddress);
}

export const chargeMyAccount = (marketAddress, amount) => async function (dispatch) {
  let token = await getToken();
  new TransactionBuilder(dispatch, token.chargeMyAccount.bind(token)).
    setTitle(`Charging account by ${amount} tokens`).
    setArguments(amount).
    onSuccessCallback(() => dispatch(updateBalance(marketAddress))).
    sendTransaction();
};

export const updateBalance = (marketAddress) => async function (dispatch) {
  let token = await getToken(marketAddress);
  let balance = await token.balanceOf(web3.eth.accounts[0]);
  dispatch({ type: 'UPDATE_BALANCE_SUCCESS', balance });
};
