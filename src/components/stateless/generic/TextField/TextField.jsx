import React, { Component } from 'react';
import styles from './TextField.scss';
import cx from 'classnames';

export default class TextField extends Component {

  validationClass = () => {
    if (this.props.error && this.props.error.length > 0)
      return styles.error;
    return '';
  };

  render() {
    return (<div>
        <input className={cx(styles.input, this.validationClass(), this.props.className)}
               placeholder={this.props.placeholder}
               ref={this.props.inputRef}
               type='text'
               onChange={this.props.validate}/>
        <p className={cx(styles.message)}>{this.props.error}</p>
    </div>);
  }
};
