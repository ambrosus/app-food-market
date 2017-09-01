import { connect } from 'react-redux';
import WelcomePage from '../stateless/specific/pages/WelcomePage/WelcomePage';
import { gotoMarket } from '../../redux/actions/MarketAction.js';
import { setMarket } from '../../redux/actions/MarketAction.js';


const mapStateToProps = (state, ownProps) => state.market;

const mapDispatchToProps = (dispatch, ownProps) => ({
  onGoClick: (address) => {
    var a = setMarket(address);
    dispatch(a);
    ownProps.history.push('market');
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
