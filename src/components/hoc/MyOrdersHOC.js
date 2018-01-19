import { connect } from 'react-redux';
import { selectOffer } from '../../redux/actions/OfferAction.js';
import { fetchTrades } from '../../redux/actions/TradesAction';
import { setPaginationPage } from '../../redux/actions/PaginationAction';
import OrdersPage from '../stateless/specific/pages/OrdersPage/OrdersPage';

const mergeTradesWithAssets = (trades) => {
  // TODO: merge trades with assets
  return trades;
  // agreements.map((agreement) => Object.assign(agreement, { ...agreement.offer, address: agreement.address }))
};

const mapStateToProps = (state) => {
  const { paginationPage, trades, tradesAmount, address } = state.market;
  return {
    marketAddress: address,
    trades: mergeTradesWithAssets(trades),
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
