import { connect } from 'react-redux';
import ProductContainer from '../../stateless/ProductContainer/ProductContainer.jsx';
import { getAllOffers } from "../../../redux/actions/MarketAction.js";

const mapStateToProps = state => {
  return {
    market: state.market,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: (address) => { 
    	if (address) {
    		dispatch(getAllOffers(address));
    	}
    }
  }
}

const Market = connect(mapStateToProps, mapDispatchToProps)(ProductContainer);

export default Market;