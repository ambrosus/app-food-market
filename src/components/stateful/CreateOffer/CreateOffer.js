import { connect } from 'react-redux';
import CreateOfferPage from '../Pages/CreateOfferPage/CreateOfferPage.jsx';
import getAllOffersOrCreateMarket from "../../../redux/actions/MarketAction.js";
import { executeEthereumTransaction } from '../../../redux/actions/TransactionAction.js';
import { createMarket } from '../../../redux/actions/MarketAction.js';
import Ambrosus from 'ambrosus';
import IPFSUploader from 'ipfs-image-web-upload';
import IPFS from 'ipfs';

const mapStateToProps = state => {
  return {
    address: state.market.address,
  };
};

const uploadToIPFS = async (ipfs, image) => {
  const uploader = new IPFSUploader(ipfs);
  return await uploader.uploadBlob(image);
}

const dispatchTransaction = async (dispatch, offer, address) => {
  const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract);
  dispatch(executeEthereumTransaction(
    (async () => (await offerRepo.save(address, { ...offer, seller: web3.eth.accounts[0] })).transactionHash)(),
    'Creating offer', '/'));
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: async (offer, image, address) => {
      if (Ambrosus == null)
        return;
      if (image){
        var ipfs = new IPFS();
        ipfs.on('ready', async () => {
          offer.imageHash = await uploadToIPFS(ipfs, image);
          dispatchTransaction(dispatch, offer, address);       
        });
      }
      else
      {
        dispatchTransaction(dispatch, offer, address);
      }
    }
  }
}

const CreateOffer = connect(mapStateToProps, mapDispatchToProps)(CreateOfferPage);

export default CreateOffer;