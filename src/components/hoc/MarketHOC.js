import { connect } from 'react-redux';
import { selectOffer } from '../../redux/actions/OfferAction.js';
import MarketPage from '../stateless/specific/pages/MarketPage/MarketPage';

const mapStateToProps = (state) => ({
  market: state.market,
  qualities: state.market.qualities,
  offers: state.market.offers,
});

const mapDispatchToProps = (dispatch) => ({

  buyAction: (offer) => {
    dispatch(selectOffer(offer));
  },

  moreDetailsAction: (offer) => {
    dispatch(selectOffer(offer));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage);
