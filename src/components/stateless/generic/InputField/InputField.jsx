import React, { Component } from 'react';
import styles from './InputField.scss';
import PropTypes from 'prop-types';
import ErrorList from '../ErrorList/ErrorList';

export default class InputField extends Component {

  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    errors: [],
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

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
             value={this.state.value}
             onChange={this.onChange.bind(this)}
             className={styles.value} />
        <ErrorList errors={this.props.errors} />
    </div>);
  }
};
