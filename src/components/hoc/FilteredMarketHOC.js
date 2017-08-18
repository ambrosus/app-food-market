import { connect } from 'react-redux';
import MarketHOC from './MarketHOC';

const mapStateToProps = (state) => ({
  filter: state.market.filter,
  offers: state.market.offers,
  categories: state.categories,
  qualities: state.market.qualities.concat(['All']),
});

export default connect(mapStateToProps)(MarketHOC);
