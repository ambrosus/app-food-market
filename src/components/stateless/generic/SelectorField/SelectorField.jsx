import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './SelectorField.scss';

export default class SelectorField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.array.isRequired,
  };

  static defaultProps = {
    options: [],
  };

  render() {
    return (<div>
      <select className={classnames(styles.select, this.props.className)}
              onChange={this.onChange.bind(this)}
              value={this.props.value}>
        { <option defaultValue selected disabled>{ this.props.placeholder }</option> }
        {this.props.options.map((option, index) => <option key={index}>{option.value}</option>)}
      </select>
    </div>);
  }

  onChange(event) {
    let state = {
      value: event.target.value,
    };
    this.setState(state, this.props.onChange.bind(this, this.props.label, state));
  }
}