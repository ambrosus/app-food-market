import { connect } from 'react-redux';
import ProductContainer from '../stateless/ProductContainer/ProductContainer.jsx';
import getAllOffersOrCreateMarket from "../../redux/actions/MarketAction.js";

const mapStateToProps = state => {
  return {
    offers: state.market.offers,
    address: state.market.address,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: (address) => dispatch(getAllOffersOrCreateMarket(address))
  }
}

const Market = connect(mapStateToProps, mapDispatchToProps)(ProductContainer);

export default Market;