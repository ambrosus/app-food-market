import { connect } from 'react-redux';
import ProductContainer from '../../stateless/ProductContainer/ProductContainer';
import { getAllOffers } from "../../../redux/actions/MarketAction.js";
import { gotoMarket } from "../../../redux/actions/MarketAction.js";
import { selectOffer } from "../../../redux/actions/OfferAction.js";
import * as Cookies from "js-cookie";

const mapStateToProps = state => {
  return {
    market: state.market,
    filter: state.market.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: (address) => { 
      if (address) {
        dispatch(getAllOffers(address));
      } else {        
        var addressFromCookies = Cookies.get('market_address', address);      
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
}

const Market = connect(mapStateToProps, mapDispatchToProps)(ProductContainer);

export default Market;