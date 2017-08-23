import IPFSUploader from 'ipfs-image-web-upload';
import Ambrosus from 'ambrosus';
import { showModal, hideModal } from './ModalAction.js';
import {
  statusAddPendingTransaction,
  statusAddSuccessTransaction,
  statusAddFailedTransaction,
} from './TransactionStatusAction.js';
import { withIPFS } from '../../utils/withIPFS.js';
import TransactionBuilder from '../../utils/transactionBuilder';

const uploadToIPFS = async (ipfs, image) => {
  const uploader = new IPFSUploader(ipfs);
  return await uploader.uploadBlob(image);
};

export const selectOffer = (offer) => ({
  type: 'SELECT_OFFER',
  offer,
});

export const saveNewOffer = (offer) => ({
  type: 'SAVE_NEW_OFFER',
  offer,
});

export const resetSelectedOffer = () => ({
  type: 'RESET_SELECTED',
});

export const createOffer = (offer, image, marketAddress, history) => async function (dispatch) {
  if (image) {
    dispatch(showModal('TransactionProgressModal', { title: 'Uploading image' }));
    withIPFS(async (ipfs) => {
      offer.imageHash = await uploadToIPFS(ipfs, image);
      dispatch(hideModal('TransactionProgressModal'));
      dispatch(doCreateOffer(offer, marketAddress, history));
    });
  } else {
    dispatch(doCreateOffer(offer, marketAddress, history));
  }
};

export const doCreateOffer = (offer, address, history) => async function (dispatch) {
  const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract);
  let market = await new Ambrosus.MarketRepository().fromAddress(address);
  if (offer.quality) {
    let requirementsRepository = new Ambrosus.RequirementsRepository();
    let requirements = await requirementsRepository.findQualityByName(offer.quality, market);
    offer.requirementsAddress = requirements.getAddress();
  }

  new TransactionBuilder(dispatch, offerRepo.save.bind(offerRepo)).
    setTitle('Creating offer').
    setArguments(address, { ...offer, seller: web3.eth.accounts[0] }).
    onTxCallback(() => dispatch(saveNewOffer(offer))).
    onSuccessCallback(() => history.push('market')).
    sendTransaction();
};
