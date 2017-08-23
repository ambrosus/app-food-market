import React from 'react';
import { connect } from 'react-redux';
import ProfilePage from '../stateless/specific/pages/ProfilePage/ProfilePage';
import { updateBalance } from '../../redux/actions/TokenAction';

const mapStateToProps = state => ({
  balance: state.token.balance,
  marketAddress: state.market.address,
  decimals: state.token.decimals,
});

const mapDispatchToProps = dispatch => ({
  refreshBalance: (marketAddress) => dispatch(updateBalance(marketAddress)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
