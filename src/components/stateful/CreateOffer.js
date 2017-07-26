import { connect } from 'react-redux';
import CreateOfferPage from './Pages/CreateOfferPage/CreateOfferPage.jsx';
import getAllOffersOrCreateMarket from "../../redux/actions/MarketAction.js";
import { executeEthereumTransaction } from '../../redux/actions/TransactionAction.js';
import { createMarket } from '../../redux/actions/MarketAction.js';
import Ambrosus from 'ambrosus';

const mapStateToProps = state => {
  return {
    address: state.market.address,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: async (offer, address) => {
      if (Ambrosus == null)
        return;
      const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract);
      dispatch(executeEthereumTransaction(
        (async () => (await offerRepo.save(address, { ...offer, seller: web3.eth.accounts[0] })).transactionHash)(),
        'Creating offer', '/'));
    }
  }
}

const CreateOffer = connect(mapStateToProps, mapDispatchToProps)(CreateOfferPage);

export default CreateOffer;