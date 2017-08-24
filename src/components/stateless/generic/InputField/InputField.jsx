import React, { Component } from 'react';
import styles from './InputField.scss';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class InputField extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    errors: [],
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
        <ul className={classnames({
          [styles.showErrors]: this.props.errors.length > 0,
          [styles.hideErrors]: !this.props.errors,
        })}>
          { this.props.errors.map(error => (<li> {error} </li>)) }
        </ul>
    </div>);
  }
};
