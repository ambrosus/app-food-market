import { connect } from 'react-redux';
import WelcomePage from '../stateless/specific/pages/WelcomePage/WelcomePage';
import { gotoMarket } from '../../redux/actions/MarketAction.js';
import * as Cookies from 'js-cookie';

const mapStateToProps = (state, ownProps) => state.market;

const mapDispatchToProps = (dispatch, ownProps) => ({
  onGoClick: (address) => {
    Cookies.set('market_address', address);

    //dispatch(gotoMarket(address));
    ownProps.history.push('market');
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
