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
  return (<InputField text='Unit Price (€)'
                            className={this.props.className}
                            errors={this.props.errors}
                            onChange={this.props.onChange}
                            label='packageWeight'/>);
  }
};
