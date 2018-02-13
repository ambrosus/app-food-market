import IPFSUploader from 'ipfs-image-web-upload';
import Ambrosus from 'ambrosus';
import { showModal, hideModal } from './ModalAction.js';
import { withIPFS } from '../../utils/withIPFS.js';
import api from '../../api';
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

export const createOffer = (offer, image, marketAddress, deviceList, history) => async function (dispatch) {
  const responseCreate = await api.assets.createAsset(offer);
  if (!responseCreate) {
    dispatch(showModal('ErrorModal', { reason: 'Transaction has been failed' }));
    return;
  }
  const statementId =  responseCreate.id;
  offer.origin = statementId;
  const responseUpload = await api.files.uploadFile(statementId, image, 'asset');
  dispatch(doCreateOffer(offer, marketAddress, deviceList, history));
};

export const doCreateOffer = (offer, address, deviceList, history) => async function (dispatch) {
  const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract);
  const ipfsHash = 'QmVv6kNDgwSYw6Xk6dpv1uQLrAWDYy5fYb3NiFS3XEJCk7';
  let market = await new Ambrosus.MarketRepository().fromAddress(address);
  if (offer.quality) {
    let requirementsRepository = new Ambrosus.RequirementsRepository();
    let requirements = await requirementsRepository.findQualityByName(offer.quality, market, ipfsHash);
    offer.requirementsAddress = requirements.getAddress();
  }
  new TransactionBuilder(dispatch, offerRepo.save.bind(offerRepo)).
    setTitle('Creating offer').
    setArguments(address, { ...offer, seller: web3.eth.accounts[0] }, deviceList, ipfsHash).
    onTxCallback(() => dispatch(saveNewOffer(offer))).
    onSuccessCallback(() => history.push('market')).
    send();
};
