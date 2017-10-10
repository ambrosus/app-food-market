import React, { Component } from 'react';
import styles from './WelcomePage.scss';
import Label from '../../../generic/Label/Label';
import TextField from '../../../generic/TextField/TextField';
import Button from '../../../generic/Button/Button';
import Link from 'react-router-dom/es/Link';
import PropTypes from 'prop-types';

class WelcomePage extends Component {

  static propTypes = {
    onGoClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };
  }

  onAddressChange(label, inputState) {
    this.setState({
      [label]: inputState.value,
    });
  }

  onClick() {
    this.props.onGoClick(this.state.address);
  }

  render() {
    return (
      <div className={styles.page}>
        <img className={styles.logo} src="./static/images/ambrosus-animated.gif"/>
        <div className={styles.container}>
          <Label className={styles.header} text='Welcome'/>
          <div>
            <Label className={styles.label} text='Go to existing market:'/>
            <div className={styles.row}>
              <TextField onChange={this.onAddressChange.bind(this)}
                         label="address"
                         placeholder="contact address"
                         value={this.state.address}
                         className={styles.field}/>
              <Button className={styles.button} onClick={this.onClick.bind(this)}>Go</Button>
            </div>
          </div>
          <span className={styles.text}>or</span>
          <Button className={styles.newAccount} onClick={this.props.createMarket}>
            <Link className={styles.link} to="/market">Create new market</Link>
          </Button>
        </div>
        <Link to='/market'>
          <img className={styles.smallLogo} src="./static/images/ambrosus-small.png"/>
        </Link>
      </div>);
  }
}

export default WelcomePage;
