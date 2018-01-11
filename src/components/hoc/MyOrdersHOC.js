import { connect } from 'react-redux';
import { selectOffer } from '../../redux/actions/OfferAction.js';
import { fetchMyAgreements } from '../../redux/actions/AgreementsAction';
import { setPaginationPage } from '../../redux/actions/PaginationAction';
import OrdersPage from '../stateless/specific/pages/OrdersPage/OrdersPage';


const mergeAgreementWithOffer = (agreements) => (
  agreements.map((agreement) => Object.assign(agreement, { ...agreement.offer, address: agreement.address }))
);

const mapStateToProps = (state) => {
  const { paginationPage, orders, ordersAmount, address } = state.market;
  return {
    marketAddress: address,
    orders: mergeAgreementWithOffer(orders),
    ordersAmount: ordersAmount,
    paginationPage: paginationPage,
    getOptions: (offer) => [
      {
        field: 'Status',
        value: offer.status,
      }, {
        field: 'Value',
        value: `€${(offer.pricePerPackage * offer.quantity).toFixed(state.token.decimals)}`,
      },
    ],
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: (marketAddress) => {
    dispatch(fetchMyAgreements(marketAddress));
  },

  moreDetailsAction: (offer) => {
    dispatch(selectOffer(offer));
  },

  paginationAction: (page) => {
    dispatch(setPaginationPage(page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
