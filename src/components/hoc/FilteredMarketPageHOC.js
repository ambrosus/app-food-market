import { connect } from 'react-redux';
import MarketPage from '../stateless/specific/pages/MarketPage/MarketPage.jsx';
import { resetFilter, updateFilter } from '../../redux/actions/MarketAction.js';

const mapStateToProps = state => ({ filter: state.market.filter });

const mapDispatchToProps = (dispatch) => ({
  qualityChange: (filter) => dispatch(updateFilter('quality', filter === 'All' ? undefined : filter)),
  categoryChange: (filter) => dispatch(updateFilter('category', filter === 'All' ? undefined : filter)),
  dispose: () => dispatch(resetFilter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage);
