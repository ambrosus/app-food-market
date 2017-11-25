import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Label from '../../../generic/Label/Label';
import SelectorField from '../../../generic/SelectorField/SelectorField';
import styles from './CreateOfferPage.scss';

export default class OriginSelector extends Component {

  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
  };

getOrigin() {
    return [{'value': 'China'}, {'value': 'Hong Kong'},
    {'value' : 'Tanzania'}, {'value': 'United States'}];
  }

  render() {
  return (
  <span>
  	 <Label className='OriginSelector' text='Origin:'/>
         <SelectorField className={styles.selector}
                             placeholder="Select origin"
                             onChange={this.onChange.bind(this)}
        		     options={this.getOrigin()}
			     label='origin'/>

    </span>);
  }

  onChange() {
    let state = {
      value: this.refs.input.value,
    };
    this.setState(state, this.props.onChange.bind(this, this.props.label, state));
  }
};
