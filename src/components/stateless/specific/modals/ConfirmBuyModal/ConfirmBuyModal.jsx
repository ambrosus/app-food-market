import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './ConfirmBuyModal.scss';
import Label from '../../../generic/Label/Label';
import Button from '../../../generic/Button/Button';
import AttributeValueFieldContainer from '../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';

class ConfirmBuyModal extends Component {

  static defaultProps = {
    visible: false,
  };

  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    marketAddress: PropTypes.string.isRequired,
  };

  total() {
    return (this.props.quantity * this.props.offer.pricePerPackage / 100).toFixed(2);
  }

  weight() {
    return this.props.quantity * this.props.offer.packageWeight / 100;
  }

  buy() {
    console.log(this.props.marketAddress);
    this.props.onConfirm(this.props.marketAddress, this.props.offer, this.props.quantity);
  }

  render() {
    return (<div>
      <div className={cx(styles.modal, this.props.className)}>
        <div className={styles.inner}>
          <div className={styles.upper}>
            <Label className={styles.title} text='Confirm buy'/>
            <div className={styles.description}>We put {this.total()} EUR tokens into ESCROW</div>
            <div className={styles.table}>
              <AttributeValueFieldContainer
                options={[
                  {
                    field: 'Price',
                    value: `${(this.props.offer.pricePerUnit / 100).toFixed(2)} euro / kg`,
                  },
                  {
                    field: 'Price per package',
                    value: `${(this.props.offer.pricePerPackage / 100).toFixed(2)} euro`,
                  },
                  {
                    field: 'Per package',
                    value: `${this.props.offer.packageWeight / 100} kg`,
                  },
                ]}/>
              <AttributeValueFieldContainer
                options={[
                  { field: 'TOTAL WEIGHT', value: `${this.weight()} kg` },
                  { field: 'TOTAL PRICE', value: `${this.total()} euro` },
                ]}/>
            </div>
          </div>
          <div className={styles.lower}>
            <div><input id='checkBox' type='checkbox'/> I want to insure my delivery for 2% of value of
              delivery
            </div>
            <div className={styles.buttons}>
              <Button onClick={this.props.onCancel} className={styles.cancel}>Cancel</Button>
              <Button onClick={this.buy.bind(this)} className={styles.confirm}>Confirm my order</Button>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default ConfirmBuyModal;
