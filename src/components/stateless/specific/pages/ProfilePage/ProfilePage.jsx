import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import { Link } from 'react-router-dom';
import styles from './ProfilePage.scss';

class ProfilePage extends Component {

  static propTypes = {
    balance: PropTypes.number,
    marketAddress: PropTypes.string,
  };

  componentDidMount() {
    this.props.refreshBalance(this.props.marketAddress);
  }

  render() {
    return (
      <div>
        <NavigationBar title='Profile'/>
        <p>{`Your balance: ${(this.props.balance).toFixed(this.props.decimals)}`}</p>
        <p>
          <Link className={styles.link} to="#"
                onClick={() => this.props.chargeBalance(this.props.marketAddress)}>Charge
          </Link>
        </p>
        <p><Link className={styles.link} to='create-requirements'>Create quality requirements</Link></p>
      </div>
    );
  }
}

export default ProfilePage;
