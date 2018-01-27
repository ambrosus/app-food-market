import { connect } from 'react-redux';
import { selectOffer } from '../../redux/actions/OfferAction.js';
import { fetchTrades } from '../../redux/actions/TradesAction';
import { setPaginationPage } from '../../redux/actions/PaginationAction';
import OrdersPage from '../stateless/specific/pages/OrdersPage/OrdersPage';

const mapStateToProps = (state) => {
  const { paginationPage, trades, tradesAmount, address } = state.market;
  return {
    marketAddress: address,
    trades,
    tradesAmount: tradesAmount,
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTrades: () => {
    dispatch(fetchTrades());
  },

  moreDetailsAction: (offer) => {
    dispatch(selectOffer(offer));
  },

  paginationAction: (page) => {
    dispatch(setPaginationPage(page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
