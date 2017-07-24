import Ambrosus from "ambrosus";
import { waitForWeb3 } from "./Action.js";
var delay = require('timeout-as-promise');

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
    while (typeof web3 === 'undefined')
      await delay(200);
    Ambrosus.setProvider(web3.currentProvider);
    const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract);
    const marketRepo = new Ambrosus.MarketRepository(Ambrosus.MarketContract);
    const market = await marketRepo.fromAddress('0x335d7cb39b2ef2fc0c24045658543ca2daad70e4');
    var offers = await offerRepo.getAllFromMarket(market);
    dispatch(receiveAllOffers(offers));
  };
};

export default getAllOffers;