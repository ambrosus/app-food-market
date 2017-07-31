import { connect } from 'react-redux';
import MarketPage from '../Pages/MarketPage/MarketPage.jsx';
import { updateFilter, resetFilter } from "../../../redux/actions/MarketAction.js";

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    qualityChange: (filter) => dispatch(updateFilter('quality', filter == 'None' ? undefined : filter)),
    categoryChange: (filter) => dispatch(updateFilter('category', filter == 'None' ? undefined : filter)),
    dispose: () => dispatch(resetFilter()),
  }
}

const MarketPageState = connect(mapStateToProps, mapDispatchToProps)(MarketPage);

export default MarketPageState;