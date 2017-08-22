import { statusAddFailedTransaction,
statusAddPendingTransaction,
statusAddSuccessTransaction } from './TransactionStatusAction.js';
import { hideModal, showModal } from './ModalAction.js';
import { waitForAmbrosus } from '../../utils/waitForAmbrosus';
import * as Cookies from 'js-cookie';
import Ambrosus from 'ambrosus';

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
        let temporaryHashCode;
        marketRepository.create(INITIAL_TOKENS, (transactionHash) => {
            temporaryHashCode = transactionHash;
            dispatch(statusAddPendingTransaction({
                  address: temporaryHashCode,
                  caption: 'Creating contract',
                  url: '/market',
                }));
            dispatch(createMarketResponse(transactionHash));
            dispatch(showModal('TransactionProgressModal', { title: 'Creating market' }));
          }).then((myContract) => {
            console.log(myContract);

            dispatch(statusAddSuccessTransaction({
                address: temporaryHashCode,
                caption: 'Creating contract',
                url: '/market',
              }));

            dispatch(createMarketSuccess({
                address: myContract.marketContract.address,
              }));

            dispatch(hideModal());

            Cookies.set('market_address', myContract.marketContract.address);

          }).catch((err) => {
            dispatch(statusAddFailedTransaction(
                {
                    caption: err.message,
                    url: '/market',
                  }));
            dispatch(showModal('ErrorModal', { reason: err }));
          });
      };



export const getAllOffers = (address) => async function (dispatch) {
        dispatch(requestAllOffers());
        await waitForAmbrosus();
        const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract);
        const marketRepo = new Ambrosus.MarketRepository(Ambrosus.MarketContract);
        const market = await marketRepo.fromAddress(address);
        let offers = await offerRepo.getAllFromMarket(market);
        dispatch(receiveAllOffers(offers));
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
