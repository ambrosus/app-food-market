import { connect } from 'react-redux';
import { showModal } from '../../redux/actions/ModalAction';
import { fetchAttributes } from '../../redux/actions/AttributesAction';
import ProductBatch from '../stateless/specific/pages/ProductPage/ProductBatch/ProductBatch';
import { fetchMeasurements, setDefaultMeasurementsForm } from '../../redux/actions/MeasurementsAction';

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

  getAttributes: (requirementsAddress, measurementsAddress) => {
    dispatch(fetchAttributes(requirementsAddress));
    dispatch(fetchMeasurements(measurementsAddress));
  },

  selectBatch: (batchId) => {
    dispatch(setDefaultMeasurementsForm([{ batchId: batchId }]));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductBatch);
