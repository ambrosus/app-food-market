import { connect } from 'react-redux';
import CreatingMarketPage from './CreatingMarketPage';
import { createMarket } from "../../../../../redux/actions/MarketAction.js";
import Ambrosus from 'ambrosus';

const mapStateToProps = state => {
  return {  	
  	market: state.market,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: () => { dispatch(createMarket()) }
  }
}

const CreatingMarketContainter = connect(mapStateToProps, mapDispatchToProps)(CreatingMarketPage);

export default CreatingMarketContainter;