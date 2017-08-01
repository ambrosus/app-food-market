import { connect } from 'react-redux';
import MarketPage from '../../stateless/specific/pages/MarketPage/MarketPage.jsx';
import { updateFilter, resetFilter } from "../../../redux/actions/MarketAction.js";

const mapStateToProps = state => {
  return {
    filter: state.market.filter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    qualityChange: (filter) => dispatch(updateFilter('quality', filter === 'None' ? undefined : filter)),
    categoryChange: (filter) => dispatch(updateFilter('category', filter === 'None' ? undefined : filter)),
    dispose: () => dispatch(resetFilter()),
  }
};

const FilteredMarketPage = connect(mapStateToProps, mapDispatchToProps)(MarketPage);

export default FilteredMarketPage;