import { withRouter } from 'react-router';
import IPFSUploader from 'ipfs-image-web-upload';
import Ambrosus from 'ambrosus';
import { executeEthereumTransaction } from './TransactionAction.js';
import { transactionMined } from '../../utils/blockchainEvents.js';
import { withIPFS } from '../../utils/with_ipfs.js';

const uploadToIPFS = async (ipfs, image) => {
  const uploader = new IPFSUploader(ipfs);
  return await uploader.uploadBlob(image);
}

export const createOffer = (offer, image, marketAddress, history) => {
  return async function(dispatch) {
      if (image) {
        withIPFS(async (ipfs) => {
          offer.imageHash = await uploadToIPFS(ipfs, image);
          dispatch(doCreateOffer(offer, marketAddress, history));
        });
      } else {
        dispatch(doCreateOffer(offer, marketAddress, history));
      }
  };
}

export const doCreateOffer = (offer, address, history) => {  
  return async function(dispatch) {
    const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract);    
    dispatch(executeEthereumTransaction(
      (async () => {
        var market = await offerRepo.save(address, { ...offer, seller: web3.eth.accounts[0] });
        transactionMined(market.transactionHash).then( () => {
          history.push('/market');
        });
        return market.transactionHash;
      })(),
      'Creating offer', '/')
    );
    
  }
}

export const selectOffer = (offer) => {
  return {
    type: 'SELECT_OFFER',
    offer
  }
}
