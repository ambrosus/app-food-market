import Ambrosus from "ambrosus";

const requestAllOffers = (address) => {
    return {
        type: 'REQUEST_OFFERS',
        address
    };
};

const receiveAllOffers = (offers) => {
    return {
        type: 'RECEIVE_OFFERS',
        offers
    };
};

const getAllOffers = (address) => {
	return async function(dispatch){
		dispatch(requestAllOffers(address));
		var offers = await new Ambrosus.OfferRepository(/*OfferContract*/)
			.getAllFromMarket(new Ambrosus.MarketRepository(/*MarketContract*/));
		dispatch(receiveAllOffers(offers));
	};
};

export default getAllOffers;