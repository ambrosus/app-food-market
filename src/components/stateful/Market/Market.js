import { connect } from 'react-redux';
import ProductContainer from '../../stateless/ProductContainer/ProductContainer.jsx';
import getAllOffersOrCreateMarket from "../../../redux/actions/MarketAction.js";

const mapStateToProps = state => {
  return {
    market: state.market,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: (address) => dispatch(getAllOffersOrCreateMarket(address))
  }
}

const Market = connect(mapStateToProps, mapDispatchToProps)(ProductContainer);

export default Market;