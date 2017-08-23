import { connect } from 'react-redux';
import { selectOffer } from '../../redux/actions/OfferAction.js';
import { fetchMyAgreements } from '../../redux/actions/AgreementsAction';
import OrdersPage from '../stateless/specific/pages/OrdersPage/OrdersPage';

const mergeAgreementWithOffer = (agreements) => (
  agreements.map((agreement) => Object.assign(agreement, { ...agreement.offer, address: agreement.address }))
);

const mapStateToProps = (state) => ({
  marketAddress: state.market.address,
  orders: mergeAgreementWithOffer(state.market.orders),
  getOptions: (offer) => [
    {
      field: 'Status',
      value: offer.status,
    }, {
      field: 'Value',
      value: `€${(offer.pricePerPackage * offer.quantity).toFixed(state.token.decimals)}`,
    },
  ],

});

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: (marketAddress) => {
    dispatch(fetchMyAgreements(marketAddress));
  },

  moreDetailsAction: (offer) => {
    dispatch(selectOffer(offer));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
