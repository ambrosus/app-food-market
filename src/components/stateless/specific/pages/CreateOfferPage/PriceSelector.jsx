import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Label from '../../../generic/Label/Label.jsx';
import InputField from '../../../generic/InputField/InputField';

export default class QuantitySelector extends Component {

  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
  };

  render() {
  return (
  <span>
                 <InputField text='Unit Price (€)'
                            className='PriceSelector'
                            errors={this.props.errors}
                            onChange={this.onChange.bind(this)}
                            label='packageWeight'/>

    </span>);
  }

  onChange() {
    let state = {
      value: this.refs.input.value,
    };
    this.setState(state, this.props.onChange.bind(this, this.props.label, state));
  }
};
