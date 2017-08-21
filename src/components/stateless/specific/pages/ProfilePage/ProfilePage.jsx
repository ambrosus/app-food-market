import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';

class ProfilePage extends Component {

  static propTypes = {
    balance: PropTypes.number,
    token: PropTypes.object,
  };

  componentDidMount() {
    this.props.refreshBalance(this.props.marketAddress);
  }

  render() {
    return (
      <div>
        <NavigationBar title='Profile'/>
        <p>{`Your balance: ${(this.props.balance / 100).toFixed(2)}`}</p>
      </div>
    );
  }
}

export default ProfilePage;
