import { connect } from 'react-redux';
import MarketHOC from './MarketHOC';
import { fetchToken } from '../../redux/actions/TokenAction';
import { getAllOffers, getAllRequirements, gotoMarket } from '../../redux/actions/MarketAction';
import { fetchUsername } from '../../redux/actions/ProfileAction';
import { MAX_OFFERS_AMOUNT } from './../../constants';

const mapStateToProps = (state) => {
  const { paginationPage, offers, requirements } = state.market;
  const startIndex = paginationPage * MAX_OFFERS_AMOUNT;
  const endIndex = startIndex + MAX_OFFERS_AMOUNT;
  return {
    offers: offers.slice(startIndex, endIndex),
    offersAmount: offers.length,
    categories: ['All', ...state.categories],
    requirements: ['All', ...requirements],
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchOffers: (address) => {
    dispatch(getAllOffers(address));
    dispatch(getAllRequirements(address));
    dispatch(fetchUsername(address));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketHOC);
