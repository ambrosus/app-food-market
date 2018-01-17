import { connect } from 'react-redux';
import ProductPage from '../stateless/specific/pages/ProductPage/ProductPage';
import { fetchAttributes } from '../../redux/actions/AttributesAction';
import { fetchMeasurements } from '../../redux/actions/MeasurementsAction';
import { loadStatements } from '../../redux/actions/StatementsAction';

const mapStateToProps = state => ({
  offer: state.offer,
  sidebar: 'progress',
  requirements: state.requirementsAttributes,
  decimals: state.token.decimals,
  address: state.market.address,
  statements: state.statements.list,
});

const mapDispatchToProps = (dispatch) => ({
  getAttributes: (offer) => {
    dispatch(fetchAttributes(offer.requirementsAddress));
    dispatch(fetchMeasurements(offer.measurementsAddress));
  },

  getStatements: tradeId => dispatch(loadStatements(tradeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
