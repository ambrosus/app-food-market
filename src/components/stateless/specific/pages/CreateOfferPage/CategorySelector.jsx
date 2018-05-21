import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './CreateOfferPage.scss';
import Label from '../../../generic/Label/Label';
import SelectorField from '../../../generic/SelectorField/SelectorField';

export default class CategorySelector extends Component {

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
  return (
  <span>
  	 <Label className={styles.label} text='Category:'/>
         	     <SelectorField className={styles.selector}
                             placeholder="Select category"
                             onChange={this.onChange.bind(this)}
                             options={this.props.categories} label='category'/>

    </span>);
  }

  onChange() {
    let state = {
      value: this.refs.input.value,
    };
    this.setState(state, this.props.onChange.bind(this, this.props.label, state));
  }
};
