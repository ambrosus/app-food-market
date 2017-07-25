import { retry_delay } from "./InitializeAction.js";

const requestAllOffers = () => {
  return {
    type: 'FETCH_OFFERS_REQUEST',
  };
};

const receiveAllOffers = (offers) => {
  return {
    type: 'FETCH_OFFERS_RESPONSE',
    offers
  };
};

const requestNewMarket = () => {
  return {
    type: 'CREATE_MARKET_REQUEST',
  };
};

const marketCreated = (marketContract) => {
  return {
    type: 'CREATE_MARKET_RESPONSE',
    address: marketContract.address
  }
}

export const createMarket = () => {
  var Ambrosus = global.Ambrosus;

  return async function(dispatch) {
      dispatch(requestNewMarket());
      retry_delay(() => typeof Ambrosus.MarketContract.currentProvider == 'undefined').then(async () => {
        const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract);
        const marketRepo = new Ambrosus.MarketRepository(Ambrosus.MarketContract);
        const market = await marketRepo.create(web3.eth.accounts[0]);
        dispatch(marketCreated(market.marketContract));
      });
    };
}

export const getAllOffers = (address) => {
  var Ambrosus = global.Ambrosus;

  return async function(dispatch) {
      dispatch(requestAllOffers());
      await retry_delay(() => typeof Ambrosus.MarketContract.currentProvider == 'undefined');
      const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract);
      const marketRepo = new Ambrosus.MarketRepository(Ambrosus.MarketContract);
      const market = await marketRepo.fromAddress(address);
      var offers = await offerRepo.getAllFromMarket(market);
      dispatch(receiveAllOffers(offers));
    };
}

export const getAllOffersOrCreateMarket = (address) => {
  if (address === '') {
    return createMarket();
  }
  else
    return getAllOffers(address);
};

export default getAllOffersOrCreateMarket;