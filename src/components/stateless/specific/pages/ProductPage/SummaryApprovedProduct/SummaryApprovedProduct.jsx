import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SummaryApprovedProduct.scss';
import Label from '../../../../generic/Label/Label';
import AttributeValueFieldContainer
from '../../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';
import Button from '../../../../generic/Button/Button';
import { Link } from 'react-router-dom';

class SummaryApprovedProduct extends Component {

  static propTypes = {
    offer: PropTypes.shape({
      pricePerUnit: PropTypes.number,
      pricePerPackage: PropTypes.number,
      packageWeight: PropTypes.number,
    }),
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

  toLower(text) {
    return text ? text.toLowerCase() : '';
  }

  render() {
    return (<div>
      <Label className={styles.title} text={`Order ${this.toLower(this.props.offer.status)}`}/>
      <AttributeValueFieldContainer options={this.summary()} className={styles.requirements}/>
      <Link to="product-buy">
        <Button className={styles.approvePayment}>Reorder</Button>
      </Link>
    </div>);
  }
}

export default SummaryApprovedProduct;
