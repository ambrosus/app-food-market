import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './BuyProduct.scss';
import Label from '../../../../generic/Label/Label';
import AttributeValueFieldContainer
from '../../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';
import InputField from '../../../../generic/InputField/InputField';
import Button from '../../../../generic/Button/Button';
import validation from 'react-validation-mixin';
import strategy from 'react-validatorjs-strategy';

class BuyProduct extends Component {

  constructor(props) {
    super(props);
    this.validatorTypes = strategy.createSchema(

      // Rules
      {
        quantity: 'required|numeric',
      },

      // Messages
      {
        required: 'This field is required',
        numeric: 'This is not a number',
      },
    );
    this.getValidatorData = this.getValidatorData.bind(this);
  }

  getValidatorData() {
    return {
      quantity: this.quantity.value,
    };
  }

  static propTypes = {
    offer: PropTypes.shape({
      pricePerUnit: PropTypes.number,
      pricePerPackage: PropTypes.number,
      packageWeight: PropTypes.number,
    }),
  };

  static defaultProps = {
    offer: {
      pricePerUnit: '1000',
      pricePerPackage: '50',
      packageWeight: '10',
    },
  };

  buy() {
    this.props.validate((err) => {
      if (err)
        return;
      this.props.onBuy(this.props.offer, parseInt(this.quantity.value));
    });
  }

  render() {

    const summary = [
      { field: 'Price', value: `€ ${this.props.offer.pricePerUnit / 100.0} /kg` },
      { field: 'Price per package', value: `€${this.props.offer.pricePerPackage / 100.0}` },
      { field: 'Per package', value: `${this.props.offer.packageWeight / 100.0} kg` },
    ];

    return (<div>
      <Label className={styles.title} text='Buy product'/>
      <AttributeValueFieldContainer options={summary} className={styles.requirements}/>
      <div>
        <InputField label='Packages'
                    inputRef={(e) => this.quantity = e}
                    validate={this.props.handleValidation('quantity')}
                    error={this.props.getValidationMessages('quantity')}/>
        <Button onClick={() => this.buy()}>Buy product</Button>
      </div>
    </div>);
  }
}

export default validation(strategy)(BuyProduct);
