import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import Label from '../../../generic/Label/Label';

class ProfilePage extends Component {

  static propTypes = {
    balance: PropTypes.number,
  };

  static defaultProps = {
    balance: 0,
  };

  render() {
    return (
      <div>
        <NavigationBar title='Profile'/>
        <Label text={`Your balance: ${(this.props.balance / 100).toFixed(2)}`}/>
      </div>
    );
  }
}

export default ProfilePage;
