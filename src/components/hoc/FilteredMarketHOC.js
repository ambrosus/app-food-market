import { connect } from 'react-redux';
import MarketHOC from './MarketHOC';
import { fetchToken } from '../../redux/actions/TokenAction';
import { getAllOffers, getAllRequirements, gotoMarket } from '../../redux/actions/MarketAction';
import Cookies from 'js-cookie';

const getData = (dispatch, address) => {
  dispatch(fetchToken(address));
  dispatch(getAllOffers(address));
  dispatch(getAllRequirements(address));
};

const isFilterMatch = (offer, filters) => {
  let keys = Object.keys(filters).filter((key) => filters[key]);
  return keys.every((key) => offer[key] === filters[key]);
};

const mapStateToProps = (state) => ({
  filter: state.market.filter,
  offers: state.market.offers,
  categories: state.categories,
  qualities: state.market.qualities.concat(['All']),
});

const mapDispatchToProps = (dispatch) => ({

  fetchOffers: (address, qualities) => {
    if (address) {
      getData(dispatch, address, qualities);
    } else {
      let addressFromCookies = Cookies.get('market_address', address);
      if (addressFromCookies) {
        dispatch(gotoMarket({ address: addressFromCookies }));
        getData(dispatch, addressFromCookies, qualities);
      }
    }
  },

  filteredOffers: (offers, filters) => (offers.filter((offer) => isFilterMatch(offer, filters))),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketHOC);
