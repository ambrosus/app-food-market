import React, { Component } from 'react';
import styles from './SearchField.scss';

export default class SearchField extends Component {
  render() {
    return (<div {...this.props}>
        <span className={styles.label}>{ this.props.label }</span>
        <input placeholder={ this.props.placeholder } type='text' className={styles.textField}/>
    </div>);
  }
};
