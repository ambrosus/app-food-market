import { statusAddPendingTransaction, statusAddSuccessTransaction, statusAddFailedTransaction } from './TransactionStatusAction.js';
import { showModal, hideModal } from './ModalAction.js';
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

export const resetFilter = () => {
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
        var marketRepository = new Ambrosus.MarketRepository(Ambrosus.marketArtifacts);
        marketRepository.create(web3.eth.accounts[0], (transactionHash) => {
            dispatch(statusAddPendingTransaction(transactionHash, "Creating contract", "ads"));
            dispatch(createMarketResponse(transactionHash));
            dispatch(showModal("TransactionProgressModal"));
        }).then((myContract) => {
            dispatch(statusAddSuccessTransaction(myContract.marketContract.transactionHash, "Creating contract", "ads"));
            dispatch(createMarketSuccess(myContract.marketContract.address));
            dispatch(hideModal());
        }).catch((err) => {
            dispatch(statusAddFailedTransaction("", "Creating contract", err));
            dispatch(showModal("ErrorModal", { reason: err }));
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
        window.market = market;
        // offerRepo.create(getAllFromMarket(market)).then((offers) => {
        //     receiveAllOffers(offers)
        //     dispatch(statusAddSuccessTransaction(myContract.marketContract.transactionHash, "Creating contract", "ads"));
        // }).catch((err) => {
        //     dispatch(showModal("ErrorModal", { reason: err }));
        // });


        let offers = await offerRepo.getAllFromMarket(market);

        console.log("offers", offers);
        dispatch(receiveAllOffers(offers));
    };
}