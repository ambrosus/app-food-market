import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import { Link } from 'react-router-dom';
import styles from './ProfilePage.scss';

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
        <p><Link className={styles.link} to='create-requirements'>Create quality requirements</Link></p>
      </div>
    );
  }
}

export default ProfilePage;
