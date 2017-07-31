import { statusAddPendingTransaction, statusAddSuccessTransaction, statusAddFailedTransaction } from './TransactionStatusAction.js';
import { waitForAmbrosus } from '../../utils/waitForAmbrosus';
import Ambrosus from 'ambrosus';

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

const createMarketResponse = (marketContract) => {
    return {
        type: 'CREATE_MARKET_RESPONSE',
        address: marketContract.address
    }
}

export const createMarketSuccess = (address) => {
    return {
        type: 'CREATE_MARKET_SUCCESS',
        address
    }
}

export const createMarketFailed = (reason) => {
    return {
        type: 'CREATE_MARKET_FAILED',
        reason
    }
}

export const gotoMarket = (address) => {
    return {
        type: 'GOTO_MARKET',
        address
    }
}

export const updateFilter = (key, value) => {
  return {
    type: 'FILTER_UPDATE',
    key,
    value
  }
}

export const resetFilter = () =>{
  return {
    type: 'FILTER_RESET'
  }
}

function createMarketContract(callback) {
    let MarketContract = web3.eth.contract(Ambrosus.marketArtifacts.abi);
    let tx_args = {
        from: web3.eth.accounts[0],
        gas: 500000,
        data: Ambrosus.marketArtifacts.unlinked_binary
    };
    MarketContract.new(tx_args, callback);
}

export const createMarket = () => {
    return async function(dispatch) {
        dispatch(requestNewMarket());
        await waitForAmbrosus();

        createMarketContract(function(err, myContract) {
            if (err) {
                dispatch(statusAddFailedTransaction("", "Creating contract", err));
            } else if (!myContract.address) {
                dispatch(statusAddPendingTransaction(myContract.transactionHash, "Creating contract", "ads"));
                dispatch(createMarketResponse(myContract));
            } else {
                dispatch(statusAddSuccessTransaction(myContract.transactionHash, "Creating contract", "ads"));
                dispatch(createMarketSuccess(myContract.address));
            }
        });
    };
}

export const getAllOffers = (address) => {
  return async function(dispatch) {      
      dispatch(requestAllOffers());
      await waitForAmbrosus()
      const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract);
      const marketRepo = new Ambrosus.MarketRepository(Ambrosus.MarketContract);
      const market = await marketRepo.fromAddress(address);
      let offers = await offerRepo.getAllFromMarket(market);
      dispatch(receiveAllOffers(offers));
    };
}