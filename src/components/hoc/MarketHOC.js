import { connect } from 'react-redux';
import { selectOffer } from '../../redux/actions/OfferAction.js';
import MarketPage from '../stateless/specific/pages/MarketPage/MarketPage';
import offer from '../../redux/reducers/OfferReducer';

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

  getOptions: (offer) => [{
      field: 'Price',
      value: (offer.pricePerUnit || 0).toFixed(2),
    }, {
      field: 'Seller',
      value: offer.seller,
    },
  ],

});

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage);
