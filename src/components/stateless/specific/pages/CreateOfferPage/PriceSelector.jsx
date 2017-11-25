import React, { Component } from 'react';
import InputField from '../../../generic/InputField/InputField';

export default class QuantitySelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  return (<InputField text='Price per unit quantity (€)'
                            className={this.props.className}
                            errors={this.props.errors}
                            onChange={this.props.onChange}
                            label='unitPrice'/>);
  }
};
