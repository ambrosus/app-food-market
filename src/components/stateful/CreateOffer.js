import { connect } from 'react-redux';
import CreateOfferPage from './Pages/CreateOfferPage/CreateOfferPage.jsx';
import getAllOffersOrCreateMarket from "../../redux/actions/MarketAction.js";
import { executeEthereumTransaction } from '../../redux/actions/TransactionAction.js';
import { createMarket } from '../../redux/actions/MarketAction.js';

const mapStateToProps = state => {
  return {
    address: state.market.address,
    ambrosus: state.ambrosus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: async(offer, address, ambrosus) => {
      if (ambrosus == null)
        return;
      const offerRepo = new ambrosus.OfferRepository(ambrosus.OfferContract);
      const marketRepo = new ambrosus.MarketRepository(ambrosus.MarketContract);
      dispatch(executeEthereumTransaction(
        (async () => (await offerRepo.save(address, { ...offer, seller: web3.eth.accounts[0] })).transactionHash)(),
        'Creating offer', '/'));
    }
  }
}

const CreateOffer = connect(mapStateToProps, mapDispatchToProps)(CreateOfferPage);

export default CreateOffer;