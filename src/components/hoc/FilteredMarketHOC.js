import { connect } from 'react-redux';
import MarketHOC from './MarketHOC';
import { fetchToken } from '../../redux/actions/TokenAction';
import { getAllOffers, getAllRequirements, gotoMarket } from '../../redux/actions/MarketAction';

const mapStateToProps = (state) => ({
  offers: state.market.offers,
  categories: ['All', ...state.categories],
  requirements: ['All', ...state.market.requirements],
  onFilterChange: (state) => { console.log(state); },
});

const mapDispatchToProps = (dispatch) => ({
  fetchOffers: (address) => {
    if (address) {
      dispatch(getAllOffers(address));
      dispatch(getAllRequirements(address));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketHOC);
