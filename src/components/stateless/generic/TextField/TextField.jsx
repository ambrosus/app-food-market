import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './TextField.scss';

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
    value: PropTypes.string,
  };

  render() {
    return (<input ref="input"
             className={classNames(styles.input, this.props.className)}
             onChange={this.onChange.bind(this)}
             placeholder={this.props.placeholder}
             value={this.props.value} />);
  }

  onChange() {
    let state = {
      value: this.refs.input.value,
    };
    this.setState(state, this.props.onChange.bind(this, this.props.label, state));
  }
};
