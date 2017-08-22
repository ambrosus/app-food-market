import { connect } from 'react-redux';
import { selectOffer } from '../../redux/actions/OfferAction.js';
import MarketPage from '../stateless/specific/pages/MarketPage/MarketPage';

const mapStateToProps = (state, ownProps) => ({
  marketAddress: state.market.address,
  offers: state.market.offers,
  moreDetailsPath: '/product-buy',
  ...ownProps,
});

const mapDispatchToProps = (dispatch) => ({

  moreDetailsAction: (offer) => {
    dispatch(selectOffer(offer));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage);
