import IPFSUploader from 'ipfs-image-web-upload';
import Ambrosus from 'ambrosus';
import { executeEthereumTransaction } from './TransactionAction.js';
import { transactionMined } from '../../utils/blockchainEvents.js';
import { showModal, hideModal } from './ModalAction.js';
import { statusAddPendingTransaction, statusAddSuccessTransaction, statusAddFailedTransaction } from './TransactionStatusAction.js';
import { withIPFS } from '../../utils/withIPFS.js';

const uploadToIPFS = async (ipfs, image) => {
  const uploader = new IPFSUploader(ipfs);
  return await uploader.uploadBlob(image);
}

export const createOffer = (offer, image, marketAddress, history) => {
  return async function(dispatch) {
      if (image) {
        dispatch(showModal("TransactionProgressModal", {title: "Uploading image"}));
        withIPFS(async (ipfs) => {
          offer.imageHash = await uploadToIPFS(ipfs, image);
          dispatch(hideModal("TransactionProgressModal"));
          dispatch(doCreateOffer(offer, marketAddress, history));
        });
      } else {
        dispatch(doCreateOffer(offer, marketAddress, history));        
      }
  };
};

export const doCreateOffer = (offer, address, history) => {  
  return async function(dispatch) {
    const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract); 
    var market = await new Ambrosus.MarketRepository().fromAddress(address);

    var requirementsRepository = new Ambrosus.RequirementsRepository();
    var requirements = requirementsRepository.findQualityByName(offer.requirementsName, market)
    offer.requirementsAddress = requirements.getAddress();

    offerRepo.save(address, { ...offer, seller: web3.eth.accounts[0] }, (transactionHash) => {
      dispatch(statusAddPendingTransaction(transactionHash, "Creating offer", ""));
      dispatch(showModal("TransactionProgressModal", {title: "Creating offer"}));
    }).then((myContract) => {
      dispatch(statusAddSuccessTransaction(myContract.transactionHash, "Creating offer", ""));
      dispatch(hideModal());
      history.push('/market');
    }).catch((reason) => {
      dispatch(showModal("ErrorModal", { reason }));      
    })
  }
}

export const selectOffer = (offer) => {
  return {
    type: 'SELECT_OFFER',
    offer
  }
}
