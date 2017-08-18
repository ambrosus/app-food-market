import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TextField from '../TextField/TextField';
import styles from './ValidatedTextField';

export default class ValidatedTextField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  static propTypes = {
    className: PropTypes.string,
    message: PropTypes.array,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  render() {
    return (<TextField ref="input"
                       placeholder={this.props.placeholder}
                       onChange={this.onChange.bind(this)}
                       className={this.props.className}>
      <p className={classnames(styles.message)}>{this.props.message}</p>
    </TextField>);
  }

  onChange() {
    this.setState({
      value: this.refs.input.state.value,
    }, this.props.onChange);
  }
};
