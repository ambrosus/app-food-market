import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './TextField.scss';
import classnames from 'classnames';

export default class TextField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    errors: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    errors: [],
  };

  render() {
    return (<span>
      <input ref="input"
             className={classNames(styles.input, this.props.className)}
             onChange={this.onChange.bind(this)}
             placeholder={this.props.placeholder}
             value={this.state.value}/><span className={classnames({
      [styles.showErrors]: this.props.errors.length > 0,
      [styles.hideErrors]: !this.props.errors, })}>{this.props.errors[0]}</span>
    </span>);
  }

  onChange() {
    let state = {
      value: this.refs.input.value,
    };
    this.setState(state, this.props.onChange.bind(this, this.props.label, state));
  }
};
