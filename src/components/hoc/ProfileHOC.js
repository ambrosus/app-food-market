import React from 'react';
import { connect } from 'react-redux';
import { updateBalance } from '../../redux/actions/TokenAction';
import ProfilePage from '../stateless/specific/pages/ProfilePage/ProfilePage';

const mapStateToProps = state => ({
  balance: state.token.balance,
  token: state.token.token,
});

const mapDispatchToProps = (dispatch) => ({
  getBalance: (token) => { dispatch(updateBalance(token)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
