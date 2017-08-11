import React, { Component } from 'react';
import styles from './TextField.scss';
import cx from 'classnames';
import PropTypes from 'prop-types';

export default class TextField extends Component {

  static propTypes = {
    error: PropTypes.array,
    placeholder: PropTypes.string,
    validate: PropTypes.func,
  };

  validationClass = () => {
    if (this.props.error && this.props.error.length > 0)
      return styles.error;
    return '';
  };

  render() {
    return (<div className={this.props.className}>
      <input className={cx(styles.input, this.validationClass())}
             placeholder={this.props.placeholder}
             ref={this.props.inputRef}
             type='text'
             onChange={this.props.validate}/>
      <p className={cx(styles.message)}>{this.props.error}</p>
    </div>);
  }
};
