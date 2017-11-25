import React, { Component } from 'react';
import InputField from '../../../generic/InputField/InputField';

export default class QuantitySelector extends Component {

  constructor(props) {
    super(props);
  }
  render() {
  return (
                 <InputField text='Package weight (kg)'
                            className={this.props.className}
                            errors={this.props.errors}
                            onChange={this.props.onChange}
                            label='packageWeight'/>);
  }
};
