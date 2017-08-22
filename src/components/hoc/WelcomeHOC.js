import { connect } from 'react-redux';
import WelcomePage from '../stateless/specific/pages/WelcomePage/WelcomePage';
import { gotoMarket } from '../../redux/actions/MarketAction.js';

const mapStateToProps = (state, ownProps) => state.market;

const mapDispatchToProps = (dispatch, ownProps) => ({
  onGoClick: () => {
    ownProps.history.push('market');
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
