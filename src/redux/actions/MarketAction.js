import Ambrosus from "ambrosus";
import { waitForWeb3 } from "./Action.js";

const MARKET_ADDRESS = '0x335d7cb39b2ef2fc0c24045658543ca2daad70e4';

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

const getAllOffers = (address) => {
  return async function(dispatch) {
    dispatch(requestAllOffers());
    await waitForWeb3();
    Ambrosus.setProvider(web3.currentProvider);
    const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract);
    const marketRepo = new Ambrosus.MarketRepository(Ambrosus.MarketContract);
    const market = await marketRepo.fromAddress(MARKET_ADDRESS);
    var offers = await offerRepo.getAllFromMarket(market);
    dispatch(receiveAllOffers(offers));
  };
};

export default getAllOffers;