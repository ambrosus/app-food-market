import { connect } from 'react-redux';
import ProductPage from '../stateless/specific/pages/ProductPage/ProductPage';
import { approve, reject } from '../../redux/actions/PurchaseAction';
import { fetchAttributes } from '../../redux/actions/AttributesAction';
import { fetchMeasurements } from '../../redux/actions/MeasurementsAction';

const mapStateToProps = state => ({
  offer: state.offer,
  requirements: state.requirementsAttributes,
  decimals: state.token.decimals,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  approve: (agreementAddress) => {
    dispatch(approve(agreementAddress, ownProps.history));
  },

  reject: (agreementAddress) => {
    dispatch(reject(agreementAddress, ownProps.history));
  },

  getAttributes: (offer) => {
    dispatch(fetchAttributes(offer.requirementsAddress));
    dispatch(fetchMeasurements(offer.measurementsAddress));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
