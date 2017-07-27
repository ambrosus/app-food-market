import IPFSUploader from 'ipfs-image-web-upload';
import IPFS from 'ipfs';
import Ambrosus from 'ambrosus';
import { executeEthereumTransaction } from './TransactionAction.js';


const uploadToIPFS = async (ipfs, image) => {
  const uploader = new IPFSUploader(ipfs);
  return await uploader.uploadBlob(image);
}

export const createOffer = (offer, image, marketAddress) => {
  return async function(dispatch) {
      if (image) {
        var ipfs = new IPFS();
        ipfs.on('ready', async () => {
          offer.imageHash = await uploadToIPFS(ipfs, image);
          dispatch(doCreateOffer(offer, marketAddress));
        });
      }
      else
      {
        dispatch(doCreateOffer(offer, marketAddress));
      }
  };
}

export const doCreateOffer = (offer, address) => {  
  return async function(dispatch) {
    const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract);    
    dispatch(executeEthereumTransaction(
      (async () => (await offerRepo.save(address, { ...offer, seller: web3.eth.accounts[0] })).transactionHash)(),
      'Creating offer', '/')
    );    
  }
}
