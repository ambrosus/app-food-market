import { waitForAmbrosus } from '../../utils/waitForAmbrosus';
import Ambrosus from 'ambrosus';
import TransactionBuilder from '../../utils/transactionBuilder';

const requestAllOffers = () => ({
  type: 'FETCH_OFFERS_REQUEST',
});

const receiveAllOffers = (offers) => ({
  type: 'FETCH_OFFERS_RESPONSE',
  offers,
});

const requestAllRequirements = () => ({
  type: 'FETCH_REQUIREMENT_REQUEST',
});

const receiveAllRequirements = (requirements) => ({
  type: 'FETCH_REQUIREMENT_RESPONSE',
  requirements,
});

const requestNewMarket = () => ({
  type: 'CREATE_MARKET_REQUEST',
});

const createMarketResponse = (marketContract) => ({
  type: 'CREATE_MARKET_RESPONSE',
  address: marketContract.address,
});

export const setMarket = (address) => ({
  type: 'SET_MARKET',
  address,
});

export const createMarketSuccess = ({ address }) => ({
  type: 'CREATE_MARKET_SUCCESS',
  address,
});

export const createMarketFailed = (reason) => ({
  type: 'CREATE_MARKET_FAILED',
  reason,
});

export const updateFilter = (key, value) => ({
  type: 'FILTER_UPDATE',
  key,
  value,
});

export const resetFilter = () => ({
  type: 'FILTER_RESET',
});

const INITIAL_TOKENS = 1000000;

export const createMarket = (history) => async function (dispatch) {
  dispatch(requestNewMarket());
  await waitForAmbrosus();
  let marketRepository = new Ambrosus.MarketRepository();
  new TransactionBuilder(dispatch, marketRepository.create.bind(marketRepository))
    .setTitle('Creating market')
    .onTxCallback((tx) => dispatch(createMarketResponse(tx)))
    .onSuccessCallback((market) => dispatch(createMarketSuccess({
      address: market.marketContract.address,
    })))
    .send();
};

export const getAllOffers = (address) => async function (dispatch) {
  dispatch(requestAllOffers());
  await waitForAmbrosus();
  const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract);
  const marketRepo = new Ambrosus.MarketRepository(Ambrosus.MarketContract);
  const market = await marketRepo.fromAddress(address);
  let offers = await offerRepo.getAllFromMarket(market);
  dispatch(receiveAllOffers(offers.slice(10)));
};

export const getAllRequirements = (address) => async function (dispatch) {
  dispatch(requestAllRequirements());
  await waitForAmbrosus();
  const marketRepo = new Ambrosus.MarketRepository(Ambrosus.MarketContract);
  const market = await marketRepo.fromAddress(address);
  const requirementsRepository = new Ambrosus.RequirementsRepository();
  const requirements = await requirementsRepository.getAllFromMarket(market);
  let names = await requirementsNames(requirements);
  dispatch(receiveAllRequirements(names));
};

async function requirementsNames(requirements) {
  let names = [];
  for (let i = 0; i < requirements.length; i++) {
    names.push(await requirements[i].getName());
  }

  return names;
}
