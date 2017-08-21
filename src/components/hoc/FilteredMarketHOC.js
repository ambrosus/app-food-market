import { connect } from 'react-redux';
import MarketHOC from './MarketHOC';
import { fetchToken } from '../../redux/actions/TokenAction';
import { getAllOffers, getAllRequirements, gotoMarket } from '../../redux/actions/MarketAction';
import Cookies from 'js-cookie';

const mapStateToProps = (state) => ({
  filter: state.market.filter,
  offers: state.market.offers,
  categories: ['All', ...state.categories],
  requirements: ['All', ...state.market.requirements],
  onFilterChange: (state) => { console.log(state); },
});

const mapDispatchToProps = (dispatch) => ({
  fetchOffers: ($address) => {
    let address = Cookies.get('market_address', $address) || $address;
    dispatch(getAllOffers(address));
    dispatch(getAllRequirements(address));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketHOC);
