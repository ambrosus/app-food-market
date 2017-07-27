import { wait_for_ambrosus } from '../../utils/wait_for_ambrosus.js';
import { executeEthereumTransaction } from './TransactionAction.js'; 
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

export const createMarket = () => {
  return async function(dispatch) {
      dispatch(requestNewMarket());
      await wait_for_ambrosus();     
      
      const marketRepo = new Ambrosus.MarketRepository(Ambrosus.MarketContract);
      dispatch(executeEthereumTransaction(
        (async () => {
          const market = await marketRepo.create(web3.eth.accounts[0]);
          dispatch(createMarketResponse(market.marketContract));
          dispatch(waitForMarketToBeCreated(market.marketContract.transactionHash, dispatch));
          return market.marketContract.transactionHash;
        })(),
        'Creating market', '/'));      
    };
}

const CHECK_TRANSACTION_STATUS_TIME = 1000;

export const waitForMarketToBeCreated = (tx, dispatch) => {   
  return async function(dispatch) {
    web3.eth.getTransaction(tx, function(error, transaction) {
      if (error) {
        dispatch(createMarketFailed(error));
      } else if (transaction.blockHash) {
        web3.eth.getTransactionReceipt(tx, function(error, transactionReceipt) {
          if (error) {
            dispatch(createMarketFailed(error));
          } else {
            dispatch(createMarketSuccess(transactionReceipt.contractAddress));
          }
        });        
      } else {
        setTimeout(() => waitForMarketToBeCreated(tx, dispatch), CHECK_TRANSACTION_STATUS_TIME);
      }
    });
  }
}

export const getAllOffers = (address) => {
  return async function(dispatch) {      
      dispatch(requestAllOffers());
      await wait_for_ambrosus()
      const offerRepo = new Ambrosus.OfferRepository(Ambrosus.OfferContract);
      const marketRepo = new Ambrosus.MarketRepository(Ambrosus.MarketContract);
      const market = await marketRepo.fromAddress(address);
      var offers = await offerRepo.getAllFromMarket(market);
      dispatch(receiveAllOffers(offers));
    };
}
