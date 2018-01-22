import { connect } from 'react-redux';
import WelcomePage from '../stateless/specific/pages/WelcomePage/WelcomePage';
import { gotoMarket } from '../../redux/actions/MarketAction.js';
import { setMarket } from '../../redux/actions/MarketAction.js';
import { createMarket } from '../../redux/actions/MarketAction';
import api from '../../api/index';

const mapStateToProps = (state, ownProps) => state.market;

const mapDispatchToProps = (dispatch, ownProps) => ({
  getToken: email => {
    api.authorize.getToken(email);
  },

  createAccount: async (email, token) => {
    const response = await api.authorize.createAccount(email, token);
    console.log(`Authorization response:`, response);
    return response;
  },

  goToMarket: address => {
    dispatch(setMarket(address));
    ownProps.history.push('market');
  },

  createMarket: () => {
    dispatch(createMarket());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
