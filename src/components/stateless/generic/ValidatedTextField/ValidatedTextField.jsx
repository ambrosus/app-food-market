import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TextField from '../TextField/TextField';
import styles from './ValidatedTextField';

export default class ValidatedTextField extends Component {

  static propTypes = {
    className: PropTypes.string,
    message: PropTypes.array,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  render() {
    return (<TextField className={this.props.className}>
      <p className={classnames(styles.message)}>{this.props.message}</p>
    </TextField>);
  }
};
