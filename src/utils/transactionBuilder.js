import {
  statusAddFailedTransaction,
  statusAddPendingTransaction,
  statusAddSuccessTransaction,
} from '../redux/actions/TransactionStatusAction';
import { hideModal, showModal } from '../redux/actions/ModalAction';
import { hasWeb3 } from './blockchainEvents';

export default class TransactionBuilder {

  constructor(dispatch, promise, title) {
    this.dispatch = dispatch;
    this.promise = promise;
    this.title = title || '';
    this.arguments = [];
    this.txCallback = () => {};

    this.successCallback = () => {};

    this.failCallback = () => {};

  }

  setPromise(promise) {
    this.promise = promise;
    return this;
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setArguments() {
    this.arguments = [...arguments];
    return this;
  }

  onTxCallback(callback) {
    this.txCallback = callback;
    return this;
  }

  onSuccessCallback(callback) {
    this.successCallback = callback;
    return this;
  }

  onFailCallback(callback) {
    this.failCallback = callback;
    return this;
  }

  send() {
    if (!hasWeb3()) {
      this.dispatch(showModal('ErrorModal', { title: 'You need browser supporting Web3 to do this', reason: '' }));
      return;
    }

    this.dispatch(showModal('TransactionProgressModal', { title: this.title }));
    this.promise(...this.arguments, (tx) => {
      this.tx = tx;
      this.dispatch(statusAddPendingTransaction({
        address: tx,
        caption: this.title,
      }));
      this.txCallback(tx);
    }).then((response) => {
      this.dispatch(statusAddSuccessTransaction({
        address: this.tx,
        caption: this.title,
      }));
      this.dispatch(hideModal());
      this.successCallback(response);
    }).catch((err) => {
      console.error(err);
      this.dispatch(statusAddFailedTransaction({
        address: this.tx,
        caption: this.title,
        errorMessage: err,
      }));
      this.dispatch(showModal('ErrorModal', { reason: err }));
      this.failCallback(err);
    });
  }
}
