import Ambrosus from "ambrosus";
import { waitForWeb3 } from "./Action.js";

const requestAllOffers = () => {
  return {
    type: 'REQUEST_OFFERS',
  };
};

const receiveAllOffers = (offers) => {
  return {
    type: 'RECEIVE_OFFERS',
    offers
  };
};

const requestNewMarket = () => {
  return {
    type: 'NEW_MARKET',
  };
};

const marketCreated = (marketContract) => {
  return {
    type: 'NEW_ADDRESS',
    address: marketContract.address
  }
}

export const getAllOffers = (address) => {
  if (address === '') {
    return async function(dispatch) {
      dispatch(requestNewMarket());
      await waitForWeb3();
      const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract);
      const marketRepo = new Ambrosus.MarketRepository(Ambrosus.MarketContract);
      console.log(web3.eth.accounts)
      const market = await marketRepo.create(web3.eth.accounts[0]);
      dispatch(marketCreated(market.marketContract));
    };
  }
  return async function(dispatch) {
    dispatch(requestAllOffers());
    await waitForWeb3();
    const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract);
    const marketRepo = new Ambrosus.MarketRepository(Ambrosus.MarketContract);
    const market = await marketRepo.fromAddress(address);
    var offers = await offerRepo.getAllFromMarket(market);
    dispatch(receiveAllOffers(offers));
  };
};

export default getAllOffers;