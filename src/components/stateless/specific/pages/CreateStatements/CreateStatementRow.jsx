import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './CreateStatementRow.scss';
import TextField from '../../../generic/TextField/TextField';

export default class CreateStatementRow extends Component {

  static propTypes = {
    onRowRemove: PropTypes.func.isRequired,
    onRowChange: PropTypes.func.isRequired,
  };

  render() {
    return (<div className={styles.row}>
      <TextField label='statement'
                 className={styles.statementInput}
                 value={this.props.value}
                 onChange={this.onFieldChange}
                 type='textarea'
                 placeholder='Enter your statement...'/>
      <img className={styles.removeIcon} onClick={this.onFieldRemove}
           src="./static/images/transaction-rejected.svg"/>
    </div>);
  }

  onFieldRemove = () => {
    const {onRowRemove, id} = this.props;
    onRowRemove(id);
  };

  onFieldChange = (label, inputState) => {
    this.props.onRowChange(this.props.id, inputState);
  };
}
