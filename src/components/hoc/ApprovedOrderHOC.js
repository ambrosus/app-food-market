import { connect } from 'react-redux';
import ProductPage from '../stateless/specific/pages/ProductPage/ProductPage';
import { fetchAttributes } from '../../redux/actions/AttributesAction';
import { fetchMeasurements } from '../../redux/actions/MeasurementsAction';
import { loadStatements, clearStatements } from '../../redux/actions/StatementsAction';

const mapStateToProps = state => ({
  offer: state.offer,
  sidebar: 'progress',
  requirements: state.requirementsAttributes,
  decimals: state.token.decimals,
  statements: state.statements.list,
});

const mapDispatchToProps = (dispatch) => ({
  getAttributes: (offer) => {
    dispatch(fetchAttributes(offer.requirementsAddress));
    dispatch(fetchMeasurements(offer.measurementsAddress));
  },

  getStatements: tradeId => dispatch(loadStatements(tradeId)),

  clearStatements: () => dispatch(clearStatements()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
