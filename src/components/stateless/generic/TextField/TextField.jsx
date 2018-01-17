import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './TextField.scss';
import ErrorList from '../ErrorList/ErrorList';

export default class TextField extends Component {

  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    errors: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    type  : 'input',
    errors: [],
  };

  render() {
    const { className, placeholder, type, errors } = this.props;
    return (<span className={className}>
      {
        type === 'input'
          ? <input ref="field"
                   className={classNames(styles.input, className)}
                   onChange={this.onChange.bind(this)}
                   placeholder={placeholder}
                   value={this.state.value}/>
          : <textarea
              ref='field'
              className={classNames(styles.input, className)}
              onChange={this.onChange.bind(this)}
              placeholder={placeholder}
              maxLength={400}
              value={this.state.value}/>
      }
      <ErrorList errors={errors}/>
    </span>);
  }

  onChange() {
    const state = {
      value: this.refs.field.value,
    };
    this.setState(state, this.props.onChange.bind(this, this.props.label, state));
  }
};
