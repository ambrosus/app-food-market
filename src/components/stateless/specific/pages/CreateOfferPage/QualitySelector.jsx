import React, { Component } from 'react';
import styles from './CreateOfferPage.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Label from '../../../generic/Label/Label';
import InputField from '../../../generic/InputField/InputField';
import SelectorField from '../../../generic/SelectorField/SelectorField';

export default class QualitySelector extends Component {

  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
  };

  render() {
  return (<span>
              <Label className={styles.label} text='Quality standard:'/>
              <SelectorField className={styles.selector}
                             placeholder="Select quality"
                             options={this.props.options}
                             errors={this.props.errors}
                             onChange={this.props.onChange}
                             label='quality' />

    </span>);
  }

  onChange() {
    let state = {
      value: this.refs.input.value,
    };
    this.setState(state, this.props.onChange.bind(this, this.props.label, state));
  }
};
