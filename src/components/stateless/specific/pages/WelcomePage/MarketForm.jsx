import React, { PureComponent } from 'react';
import styles from './FormStyles.scss';
import Label from '../../../generic/Label/Label';
import TextField from '../../../generic/TextField/TextField';
import Button from '../../../generic/Button/Button';
import Link from 'react-router-dom/es/Link';
import PropTypes from 'prop-types';

export default class MarketForm extends PureComponent {

  static propTypes = {
    goToMarket: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      address: '0x4bf9a0cdfeaa638620e96e356593bc2ab395f10a',
    };
  }

  onAddressChange = (label, inputState) => {
    this.setState({ [label]: inputState.value });
  };

  goToMarket = () => {
    const { address } = this.state;
    if (address.replace(/\s+/g, '')) this.props.goToMarket(address);
  };


  render() {
    return (
      <div className={styles.container}>
        <Label className={styles.header} text='Welcome'/>
        <div>
          <Label className={styles.label} text='Go to existing market:'/>
          <div className={styles.row}>
            <TextField onChange={this.onAddressChange}
                       label="address"
                       placeholder="contact address"
                       value={this.state.address}
                       className={styles.field}/>
            <Button className={styles.button} onClick={this.goToMarket}>Go</Button>
          </div>
        </div>
        <span className={styles.text}>or</span>
        <Button className={styles.newMarket} onClick={this.login}>
          <Link className={styles.link} to="/market">Create new market</Link>
        </Button>
      </div>);
  }
}
