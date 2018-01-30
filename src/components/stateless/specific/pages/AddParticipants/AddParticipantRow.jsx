import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './AddParticipantRow.scss';
import TextField from '../../../generic/TextField/TextField';

export default class CreateStatementRow extends Component {

  static propTypes = {
    onRowRemove: PropTypes.func.isRequired,
    onRowChange: PropTypes.func.isRequired,
  };

  render() {
    return (<div className={styles.participantRow}>
      <TextField label='participant'
                 className={styles.participantInput}
                 value={this.props.value}
                 onChange={this.onFieldChange}
                 placeholder='Enter participant address...'/>
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
