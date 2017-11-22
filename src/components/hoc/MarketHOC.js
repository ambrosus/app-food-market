import { connect } from 'react-redux';
import { selectOffer } from '../../redux/actions/OfferAction.js';
import MarketPage from '../stateless/specific/pages/MarketPage/MarketPage';
import offer from '../../redux/reducers/OfferReducer';

const mapStateToProps = (state, ownProps) => ({
  marketAddress: state.market.address,
  moreDetailsPath: '/product-buy',
  batchInfoPath: '/product-batch',
  status: state.market.status,
  getOptions: (offer) => [
    {
      field: 'Price',
      value: (offer.pricePerUnit || 0).toFixed(state.token.decimals),
    }, {
      field: 'Seller',
      value: offer.seller,
    },
  ],
  ...ownProps,
});

const mapDispatchToProps = (dispatch) => ({

  moreDetailsAction: (offer) => {
    dispatch(selectOffer(offer));
  },

  batchInfoAction: (offer) => {
    dispatch(selectOffer(offer));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage);
