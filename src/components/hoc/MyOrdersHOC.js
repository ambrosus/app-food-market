import { connect } from 'react-redux';
import ProductContainer from '../stateless/specific/containers/ProductContainer/ProductContainer';
import { selectOffer } from '../../redux/actions/OfferAction.js';
import { fetchMyAgreements } from '../../redux/actions/AgreementsAction';

const mergeAgreementWithOffer = (agreements) => (
  agreements.map((agreement) => Object.assign(agreement, { ...agreement.offer, address: agreement.address }))
);

const mapStateToProps = state => ({
  market: state.market,
  offers: mergeAgreementWithOffer(state.market.agreements),
  detailsPath: '/product-info',
});

const mapDispatchToProps = (dispatch) => ({
  onMount: (marketAddress) => {
    dispatch(fetchMyAgreements(marketAddress));
  },

  childrenData: (agreement) => [
    { field: 'Status', value: agreement.status },
    { field: 'Value', value: `${(agreement.amount / 100).toFixed(2)} EUR tokens` },
  ],

  buyAction: (offer) => {
    dispatch(selectOffer(offer));
  },

  moreDetailsAction: (offer) => {
    dispatch(selectOffer(offer));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
