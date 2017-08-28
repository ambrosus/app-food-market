import React from 'react';
import { connect } from 'react-redux';
import ProfilePage from '../stateless/specific/pages/ProfilePage/ProfilePage';
import { chargeMyAccount, updateBalance } from '../../redux/actions/TokenAction';
import { changeUsername } from '../../redux/actions/ProfileAction';

const DEFAULT_CHARGE_AMOUNT = 1000;

const mapStateToProps = state => ({
  balance: state.token.balance,
  marketAddress: state.market.address,
  username: state.market.username,
  decimals: state.token.decimals,
});

const mapDispatchToProps = dispatch => ({
  refreshBalance: (marketAddress) => dispatch(updateBalance(marketAddress)),
  chargeBalance: (marketAddress) => dispatch(chargeMyAccount(marketAddress, DEFAULT_CHARGE_AMOUNT)),
  changeUsername: (marketAddress, username) => dispatch(changeUsername(marketAddress, username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
