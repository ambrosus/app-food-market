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
      status: PropTypes.bool,
    }),
  };

  summary() {
    return [
      { field: 'Price per package', value: `€${(this.props.offer.pricePerPackage).toFixed(this.props.decimals)}` },
      { field: 'Packages', value: this.props.offer.quantity },
      { field: 'Total weight', value: (this.props.offer.packageWeight) * this.props.offer.quantity },
      {
        field: 'Total',
        value: `€${((this.props.offer.pricePerPackage) * this.props.offer.quantity).toFixed(this.props.decimals)}`,
      },

    ];
  }

  render() {
    const { offer } = this.props;
    return (<div>
      <Label className={styles.title} text='Order FINISHED' />
      <AttributeValueFieldContainer options={this.summary()} className={styles.requirements}/>
      <Link to="product-buy" className={styles.button}>
        <Button className={styles.approvePayment}>Reorder</Button>
      </Link>
    </div>);
  }
}

export default SummaryApprovedProduct;
