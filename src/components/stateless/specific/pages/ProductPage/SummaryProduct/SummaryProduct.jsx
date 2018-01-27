import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SummaryProduct.scss';
import Label from '../../../../generic/Label/Label';
import AttributeValueFieldContainer
  from '../../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';
import Button from '../../../../generic/Button/Button';
import { Link } from 'react-router-dom';

class SummaryProduct extends Component {

  componentDidMount() {
    if (this.props.offer.status) {
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
    onFinish: PropTypes.func,
    onReimburse: PropTypes.func,
    decimals: PropTypes.number.isRequired,
  };

  static defaultProps = {
    offer: {
      pricePerUnit: 1000,
      pricePerPackage: 50,
      packageWeight: 10,
    },
  };

  finishTrade = async () => {
    const { onFinish, offer } = this.props;
    await onFinish(offer.id);
    this.props.history.push('/orders');
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
    const [ user ] = web3.eth.accounts;
    return (<div>
      <Label className={styles.title} text='Summary'/>
      <AttributeValueFieldContainer options={this.summary()} className={styles.requirements}/>
      <div className={styles.buttonsContainer}>
        {!offer.status && offer.seller === user ? (<Button className={styles.approvePayment}
                                                           onClick={this.finishTrade}>
          Finish
        </Button>) : null}
        {offer.seller === user
          ? (<Button className={styles.button}
                     onClick={() => this.props.onApprove(this.props.offer.address)}>Approve payment</Button>) : null}
        <Button className={styles.reimburse}
                onClick={() => this.props.onReimburse(this.props.offer.address)}>Reimbursed</Button>
      </div>
    </div>);
  }
}

export default SummaryProduct;
