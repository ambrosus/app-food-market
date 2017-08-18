import { connect } from 'react-redux';
import MarketPage from '../stateless/specific/pages/MarketPage/MarketPage.jsx';

const mapStateToProps = (state) => ({
  filter: state.market.filter,
  offers: state.market.offers,
  categories: state.categories,
  qualities: state.market.qualities.concat(['All']),
});

export default connect(mapStateToProps)(MarketPage);
