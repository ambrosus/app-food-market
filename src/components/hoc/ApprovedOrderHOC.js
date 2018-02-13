import { connect } from 'react-redux';
import ProductPage from '../stateless/specific/pages/ProductPage/ProductPage';
import { fetchAttributes } from '../../redux/actions/AttributesAction';
import { fetchMeasurements } from '../../redux/actions/MeasurementsAction';
import { loadStatements, clearStatements } from '../../redux/actions/StatementsAction';
import { loadTradeInfo } from '../../redux/actions/TradesAction';

const mapStateToProps = state => ({
  offer: state.offer,
  sidebar: 'progress',
  requirements: state.requirementsAttributes,
  decimals: state.token.decimals,
});

const mapDispatchToProps = (dispatch) => ({
  getAttributes: (offer) => {
    dispatch(fetchAttributes(offer.requirementsAddress));
    dispatch(fetchMeasurements(offer.measurementsAddress));
  },

  getStatements: tradeId => dispatch(loadStatements(tradeId)),

  getTradeInfo: () => dispatch(loadTradeInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
