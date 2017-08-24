import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import { Link } from 'react-router-dom';
import styles from './ProfilePage.scss';
import InputField from '../../../generic/InputField/InputField';
import Button from '../../../generic/Button/Button';

class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = { username: props.username };
  }

  static propTypes = {
    balance: PropTypes.number,
    marketAddress: PropTypes.string,
  };

  componentDidMount() {
    this.props.refreshBalance(this.props.marketAddress);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.username !== this.state.username) {
      this.setState({ username: nextProps.username });
    }
  }

  onChange(label, state) {
    this.setState({ username: state.value });
  }

  render() {
    return (
      <div>
        <NavigationBar title='Profile'>
          <InputField value={this.state.username} text="Username" label="username" onChange={this.onChange.bind(this)}/>
          <Button onClick={()=>this.props.changeUsername(this.props.marketAddress, this.state.username)}>Change</Button>
        </NavigationBar>
        <p>{`Your balance: ${(this.props.balance).toFixed(this.props.decimals)}`}</p>
        <p>
          This is a demo so you can
          <Link className={styles.link} to="#"
                onClick={() => this.props.chargeBalance(this.props.marketAddress)}>
            charge your account with mock money!
          </Link>
        </p>
        <p><Link className={styles.link} to='create-requirements'>Create quality requirements</Link></p>
      </div>
    );
  }
}

export default ProfilePage;
