import { connect } from 'react-redux';
import ProductPage from '../stateless/specific/pages/ProductPage/ProductPage';
import { approve, reject } from '../../redux/actions/PurchaseAction';
import { finishTrade, loadTradeInfo, linkTrade, setActiveTrade } from '../../redux/actions/TradesAction';
import { fetchAttributes } from '../../redux/actions/AttributesAction';
import { fetchMeasurements } from '../../redux/actions/MeasurementsAction';
import { loadStatements } from '../../redux/actions/StatementsAction';

const mapStateToProps = state => ({
  offer: state.offer,
  requirements: state.requirementsAttributes,
  decimals: state.token.decimals,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  approve: agreementAddress => dispatch(approve(agreementAddress, ownProps.history)),

  finishTrade: async (tradeId, assetId) => await finishTrade(tradeId, assetId),

  reject: agreementAddress => dispatch(reject(agreementAddress, ownProps.history)),

  getAttributes: offer => {
    dispatch(fetchAttributes(offer.requirementsAddress));
    dispatch(fetchMeasurements(offer.measurementsAddress));
  },

  getStatements: tradeId => dispatch(loadStatements(tradeId)),

  getTradeInfo: () => dispatch(loadTradeInfo()),

  linkTrade: (tradeId, linkedTradeId) => dispatch(linkTrade(tradeId, linkedTradeId)),

  setActiveTrade: tradeId => dispatch(setActiveTrade(tradeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
