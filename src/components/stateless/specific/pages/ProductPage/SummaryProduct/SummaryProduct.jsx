import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SummaryProduct.scss';
import Label from '../../../../generic/Label/Label';
import AttributeValueFieldContainer
  from '../../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';
import Button from '../../../../generic/Button/Button';

class SummaryProduct extends Component {

  componentDidMount() {
    if (this.props.offer.status !== 'In progress') {
      this.props.history.replace('approved');
    }
  }

  static propTypes = {
    offer: PropTypes.shape({
      pricePerUnit: PropTypes.number,
      pricePerPackage: PropTypes.number,
      packageWeight: PropTypes.number,
    }),
    onApprove: PropTypes.func,
    onReimburse: PropTypes.func,
  };

  static defaultProps = {
    offer: {
      pricePerUnit: 1000,
      pricePerPackage: 50,
      packageWeight: 10,
    },
  };

  summary() {
    return [
      { field: 'Price per package', value: `€${(this.props.offer.pricePerPackage / 100.0).toFixed(2)}` },
      { field: 'Packages', value: this.props.offer.quantity },
      { field: 'Total weight', value: (this.props.offer.packageWeight / 100.0) * this.props.offer.quantity },
      {
        field: 'Total',
        value: `€${((this.props.offer.pricePerPackage / 100.0) * this.props.offer.quantity).toFixed(2)}`,
      },

    ];
  }

  render() {
    return (<div>
      <Label className={styles.title} text='Summary'/>
      <AttributeValueFieldContainer options={this.summary()} className={styles.requirements}/>
      <Button className={styles.approvePayment}
              onClick={() => this.props.onApprove(this.props.offer.address)}>Approve payment</Button>
      <Button className={styles.reimburse}
              onClick={() => this.props.onReimburse(this.props.offer.address)}>Reimbursed</Button>
    </div>);
  }
}

export default SummaryProduct;
