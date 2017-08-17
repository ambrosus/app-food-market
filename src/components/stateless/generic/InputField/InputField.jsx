import React, { Component } from 'react';
import styles from './InputField.scss';
import PropTypes from 'prop-types';

export default class InputField extends Component {

  static propTypes = {
    text: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
  };

  onChange() {
    let state = {
      value: this.refs.input.value,
    };
    this.setState(state, this.props.onChange.bind(this, this.props.label, state));
  }

  render() {
    return (<div className={styles.row}>
      <span className={styles.label}>{this.props.text}</span>
      <input ref="input"
             placeholder={this.props.placeholder}
             type='text'
             onChange={this.onChange.bind(this)}
             className={styles.value} />
      <span>{this.props.error}</span>
    </div>);
  }
};
