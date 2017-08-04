import { statusAddPendingTransaction, statusAddSuccessTransaction, statusAddFailedTransaction } from './TransactionStatusAction.js';
import { showModal, hideModal } from './ModalAction.js';
import { waitForAmbrosus } from '../../utils/waitForAmbrosus';
import * as Cookies from "js-cookie";
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

const requestAllRequirements = () => {
    return {
        type: 'FETCH_REQUIREMENT_REQUEST',
    };
};

const receiveAllRequirements = (requirements) => {
    return {
        type: 'FETCH_REQUIREMENT_RESPONSE',
        requirements
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

export const requestCreateRequirement = () => {
    return {
        type: 'CREATE_REQUIREMENT_REQUEST'
    }
}

export const responseCreateRequirement = (address) => {
    return {
        type: 'CREATE_REQUIREMENT_RESPONCE',
        address
    }
}

export const successCreateRequirement = (address) => {
    return {
        type: 'CREATE_REQUIREMENT_SUCCESS',
        address
    }
}

export const failedCreateRequirement = (address) => {
    return {
        type: 'CREATE_REQUIREMENT_FAIL',
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

export const createMarket = () => {
    return async function(dispatch) {
        dispatch(requestNewMarket());
        await waitForAmbrosus();
        var marketRepository = new Ambrosus.MarketRepository(Ambrosus.marketArtifacts);
        marketRepository.create(web3.eth.accounts[0], (transactionHash) => {
            dispatch(statusAddPendingTransaction(transactionHash, "Creating contract", "ads"));
            dispatch(createMarketResponse(transactionHash));
            dispatch(showModal("TransactionProgressModal", {title: "Creating market"}));
        }).then((myContract) => {
            dispatch(statusAddSuccessTransaction(myContract.marketContract.transactionHash, "Creating contract", "ads"));
            dispatch(createMarketSuccess(myContract.marketContract.address));
            dispatch(hideModal());
            Cookies.set('market_address', myContract.marketContract.address);
        }).catch((err) => {
            dispatch(statusAddFailedTransaction("", "Creating contract", err));
            dispatch(showModal("ErrorModal", { reason: err }));
        });
    };
}

export const createRequirement = (name, requirements, marketAddress, history) => {
    console.log(requirements)
    return async function(dispatch) {
        dispatch(requestCreateRequirement());
        await waitForAmbrosus();
        var requirementsRepository = new Ambrosus.RequirementsRepository();
        requirementsRepository.create(name, marketAddress, requirements, (transactionHash) => {
            dispatch(statusAddPendingTransaction(transactionHash, "Creating contract", "ads"));
            dispatch(responseCreateRequirement(transactionHash));
            dispatch(showModal("TransactionProgressModal"));
        }).then((_Requrements) => {
            dispatch(statusAddSuccessTransaction(_Requrements.contract.transactionHash, "Creating contract", "ads"));
            dispatch(successCreateRequirement(_Requrements.contract.address));
            dispatch(hideModal());
            history.push('/market');
        }).catch((err) => {
            console.error(err)
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
        let offers = await offerRepo.getAllFromMarket(market);
        dispatch(receiveAllOffers(offers));
    };
}

export const getAllRequirements = (address) => {
    return async function(dispatch) {
        dispatch(requestAllRequirements());
        await waitForAmbrosus();
        const marketRepo = new Ambrosus.MarketRepository(Ambrosus.MarketContract);
        const market = await marketRepo.fromAddress(address);
        const requirementsRepository = new Ambrosus.RequirementsRepository();
        const requirements = await requirementsRepository.getAllFromMarket(market);
        var names = await requirementsNames(requirements);
        dispatch(receiveAllRequirements(names));
    };
}

async function requirementsNames(requirements) {
    var names = [];
    for (var i = 0; i < requirements.length; i++) {
        names.push(await requirements[i].getName());
    }
    return names;
}



