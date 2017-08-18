import React from 'react';
import { connect } from 'react-redux';
import ProfilePage from '../stateless/specific/pages/ProfilePage/ProfilePage';

const mapStateToProps = state => ({
  balance: state.token.balance,
  token: state.token.token,
});

export default connect(mapStateToProps)(ProfilePage);
