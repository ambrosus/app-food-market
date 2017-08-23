import Ambrosus from 'ambrosus';
import TransactionBuilder from '../../utils/transactionBuilder';

export const buy = (marketAddress, offer, quantity, history) => async (dispatch) => {
  let agreement = new Ambrosus.AgreementRepository(marketAddress);
  new TransactionBuilder(dispatch, agreement.initiateAgreement.bind(agreement)).
    setTitle('Transfer to ESCROW').
    setArguments(offer.address, quantity).
    onSuccessCallback(()=>history.push('orders')).
    sendTransaction();
};

export const approve = (agreementAddress, history) => async (dispatch) => {
  let agreement = await new Ambrosus.AgreementRepository().fromAddress(agreementAddress);
  new TransactionBuilder(dispatch, agreement.accept.bind(agreement)).
    setTitle('Approve transaction').
    onSuccessCallback(()=>history.push('orders')).
    sendTransaction();
};

export const reject = (agreementAddress, history) => async (dispatch) => {
  let agreement = await new Ambrosus.AgreementRepository().fromAddress(agreementAddress);
  new TransactionBuilder(dispatch, agreement.reject.bind(agreement)).
    setTitle('Reimburse transaction').
    onSuccessCallback(()=>history.push('orders')).
    sendTransaction();
};
