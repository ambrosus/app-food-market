import { connect } from 'react-redux';
import ProductContainer from '../stateless/specific/containers/ProductContainer/ProductContainer';
import { getAllOffers, getAllRequirements, gotoMarket } from '../../redux/actions/MarketAction.js';
import { selectOffer } from '../../redux/actions/OfferAction.js';
import { fetchToken } from '../../redux/actions/TokenAction.js';
import * as Cookies from 'js-cookie';

const isFilterMatch = (offer, filters) => {
  let keys = Object.keys(filters).filter((key) => filters[key]);
  return keys.every((key) => offer[key] === filters[key]);
};

const filteredOffers = (offers, filters) => offers.filter((offer) => isFilterMatch(offer, filters));

const fetchMarketData = (dispatch, address) => {
  dispatch(fetchToken(address));
  dispatch(getAllOffers(address));
  dispatch(getAllRequirements(address));

};

const mapStateToProps = state => ({
  market: state.market,
  qualities: state.market.qualities,
  offers: filteredOffers(state.market.offers, state.market.filter),
});

const mapDispatchToProps = (dispatch) => ({
  onMount: (address) => {
    if (address) {
      fetchMarketData(dispatch, address);
    } else {
      let addressFromCookies = Cookies.get('market_address', address);
      if (addressFromCookies) {
        dispatch(gotoMarket({ address: addressFromCookies }));
        fetchMarketData(dispatch, addressFromCookies);
      }
    }
  },

  productItemFieldValues: (offer) => [
    { field: 'Price', value: '€' + offer.pricePerUnit / 100.0 + '/kg' },
    { field: 'Seller', value: offer.seller.slice(0, 10) + '...' },
  ],

  buyAction: (offer) => {
    dispatch(selectOffer(offer));
  },

  moreDetailsAction: (offer) => {
    dispatch(selectOffer(offer));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
