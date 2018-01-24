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
  await api.assets.createAsset(offer);
  withIPFS(async (ipfs) => {
    if (image) {
      dispatch(showModal('TransactionProgressModal', { title: 'Uploading image' }));
      offer.imageHash = await uploadToIPFS(ipfs, image);
    }

    dispatch(showModal('TransactionProgressModal', { title: 'Creating measurements storage' }));
    let ipfsMap = await Ambrosus.IPFSMap.create(ipfs);
    dispatch(hideModal('TransactionProgressModal'));
    dispatch(doCreateOffer(offer, marketAddress, deviceList, ipfsMap.getOwnHash(), history));
  });

};

export const doCreateOffer = (offer, address, deviceList, ipfsHash, history) => async function (dispatch) {
  const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract);
  let market = await new Ambrosus.MarketRepository().fromAddress(address);
  if (offer.quality) {
    let requirementsRepository = new Ambrosus.RequirementsRepository();
    let requirements = await requirementsRepository.findQualityByName(offer.quality, market);
    offer.requirementsAddress = requirements.getAddress();
  }

  new TransactionBuilder(dispatch, offerRepo.save.bind(offerRepo)).
    setTitle('Creating offer').
    setArguments(address, { ...offer, seller: web3.eth.accounts[0] }, deviceList, ipfsHash).
    onTxCallback(() => dispatch(saveNewOffer(offer))).
    onSuccessCallback(() => history.push('market')).
    send();
};
