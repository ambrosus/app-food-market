import { connect } from 'react-redux';
import ProductContainer from '../../stateless/specific/containers/ProductContainer/ProductContainer';
import { getAllOffers } from "../../../redux/actions/MarketAction.js";
import { gotoMarket } from "../../../redux/actions/MarketAction.js";
import { selectOffer } from "../../../redux/actions/OfferAction.js";
import * as Cookies from "js-cookie";

const isFilterMatch = (offer, filters) => {
  let keys = Object.keys(filters).filter((key) => filters[key]);
  return keys.every((key) => offer[key] === filters[key]);
};

const filteredOffers = (offers, filters) => {
  return offers.filter((offer) => isFilterMatch(offer, filters));
};

const mapStateToProps = state => {
  return {
    market: state.market,
    offers: filteredOffers(state.market.offers, state.market.filter),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: (address) => {
      if (address) {
        dispatch(getAllOffers(address));
      } else {
        let addressFromCookies = Cookies.get('market_address', address);
        if (addressFromCookies) {
          dispatch(gotoMarket(addressFromCookies));
          dispatch(getAllOffers(addressFromCookies));
        }
      }
    },

    moreDetailsAction: (offer) => {
      dispatch(selectOffer(offer));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);