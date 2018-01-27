import { connect } from 'react-redux';
import ProductPage from '../stateless/specific/pages/ProductPage/ProductPage';
import { showModal } from '../../redux/actions/ModalAction';
import { fetchAttributes } from '../../redux/actions/AttributesAction';
import { fetchMeasurements } from '../../redux/actions/MeasurementsAction';

const mapStateToProps = state => ({
  offer: state.offer,
  sidebar: 'buy',
  requirements: state.requirementsAttributes,
  decimals: state.token.decimals,
});

const mapDispatchToProps = (dispatch) => ({

  onBuy: (offer, quantity) => {
    dispatch(showModal('ConfirmBuyModal', { quantity }));
  },

  getAttributes: (offer) => {
    dispatch(fetchAttributes(offer.requirementsAddress));
    dispatch(fetchMeasurements(offer.measurementsAddress));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
