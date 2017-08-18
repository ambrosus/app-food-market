import { statusAddFailedTransaction,
statusAddPendingTransaction,
statusAddSuccessTransaction } from './TransactionStatusAction.js';
import { hideModal, showModal } from './ModalAction.js';
import { waitForAmbrosus } from '../../utils/waitForAmbrosus';
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

export const gotoMarket = ({ address }) => ({
        type: 'GOTO_MARKET',
        address,
      });

export const requestCreateRequirement = () => ({
        type: 'CREATE_REQUIREMENT_REQUEST',
      });

export const responseCreateRequirement = (address) => ({
        type: 'CREATE_REQUIREMENT_RESPONCE',
        address,
      });

export const successCreateRequirement = (address) => ({
        type: 'CREATE_REQUIREMENT_SUCCESS',
        address,
      });

export const failedCreateRequirement = (address) => ({
        type: 'CREATE_REQUIREMENT_FAIL',
        address,
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
            dispatch(statusAddSuccessTransaction({
                address: temporaryHashCode,
                caption: 'Creating contract',
                url: '/market',
              }));
            dispatch(createMarketSuccess({
                address: myContract.marketContract.address,
              }));
            dispatch(hideModal());
            dispatch(redirectToMarket(history));
          }).catch((err) => {
            dispatch(statusAddFailedTransaction(
                {
                    address: myContract.marketContract.address,
                    caption: 'Creating contract',
                    url: '/market',
                  }));
            dispatch(showModal('ErrorModal', { reason: err }));
          });
      };

export const createRequirement = (name, requirements, marketAddress, history) => async function (dispatch) {
        dispatch(requestCreateRequirement());
        await waitForAmbrosus();
        let requirementsRepository = new Ambrosus.RequirementsRepository();
        requirementsRepository.create(name, marketAddress, requirements, (transactionHash) => {
            dispatch(statusAddPendingTransaction({
                address: transactionHash,
                caption: 'Creating contract',
                url: 'ads',
              }));
            dispatch(responseCreateRequirement(transactionHash));
            dispatch(showModal('TransactionProgressModal'));
          }).then((requirements) => {
            dispatch(statusAddSuccessTransaction({
                address: requirements.contract.transactionHash,
                caption: 'Creating contract',
                url: 'ads',
              }));
            dispatch(successCreateRequirement(requirements.contract.address));
            dispatch(hideModal());
            dispatch(redirectToMarket(history));
          }).catch((err) => {
            console.error(err);
            dispatch(statusAddFailedTransaction({
                address: '',
                caption: 'Creating contract', errors: err,
              }));
            dispatch(showModal('ErrorModal', { reason: err }));
          });
      };

export const redirectToMarket = (history) => async function (dispatch) {
        history.push('market');
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
