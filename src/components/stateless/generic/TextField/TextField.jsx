import React, { Component } from 'react';
import styles from './TextField.scss';
import cx from 'classnames';
import PropTypes from 'prop-types';

export default class TextField extends Component {

  static propTypes = {
    className: PropTypes.string,
    error: PropTypes.array,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
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
             value={this.props.value}
             type='text'
             onChange={this.props.onChange}/>
      <p className={cx(styles.message)}>{this.props.error}</p>
    </div>);
  }
};
