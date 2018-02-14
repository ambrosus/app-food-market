import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './StatementRow.scss';
import TextField from '../../../generic/TextField/TextField';

export default class CreateStatementRow extends Component {

  static propTypes = {
    onRowRemove: PropTypes.func.isRequired,
    onRowChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  };

  render() {
    const { type, value, size, onRowRemove } = this.props;
    return (<div className={styles.row}>
      <div className={styles.statementInfo}>
        {type === 'file' ? <svg className={styles.fileIcon} version='1' xmlns='http://www.w3.org/2000/svg' width='2133.333' height='2133.333' viewBox='0 0 1600 1600'>
                           <path fill='#002C87' d='M260.5 150.7c-15.7 3.5-27 9.7-38.6 21.3-8.4 8.3-10.2 10.8-14.2 19-2.5 5.2-5.3 12.6-6.2 16.5-1.4 6.4-1.6 56.3-1.3 595.5l.3 588.5 2.6 7.2c4.5 12.2 9.6 20.2 18.8 29.4 9.2 9.2 16.8 14.1 29.2 18.7l7.4 2.7h833l7.4-2.7c12.7-4.7 19.9-9.4 29.6-19.2 10.4-10.4 16.1-20.5 19.5-34 1.9-7.7 2-11.5 2-126.1v-118.2l9.7-1.2c33.6-4.1 69.5-15.9 99-32.4 70.2-39.4 119.4-106 135.8-183.9 7.3-34.6 7.5-76.7.5-111.7-8.4-41.7-28.2-83.8-55.6-118.1-8.8-10.9-30.5-32.6-41.4-41.4-40.9-32.6-91.4-53.7-141.7-59.2l-6.3-.7v-83.2c0-78.9-.1-83.6-1.9-90.7-2.1-7.9-6.3-17.2-11.4-24.8-3.8-5.8-228.3-230.7-236.2-236.7-8.1-6.1-18.1-11-27.3-13.4-7.4-1.9-14.2-1.9-309.1-1.8-165.9.1-302.5.3-303.6.6zm589.7 145l.3 95.8 2.6 7.2c4.5 12.3 9.6 20.2 18.8 29.3 9.6 9.5 16.4 13.9 28.4 18.4l8.2 3.1 95.8.3 95.7.3v150.6l-6.2.7c-41.5 4.5-83.4 19.6-119.1 42.9-58.4 38.2-100.8 97.8-117.1 164.7-6.4 26.4-7.1 33.1-7.1 66.5 0 26.5.3 31.5 2.3 43 10.1 58.5 36.1 109.3 76.7 150.1 44 44.3 100.3 72.1 160.8 79.5l9.7 1.2V1300H250l.2-540.3.3-540.2 2.4-4.5c4.2-8.1 10.2-12.6 18.6-14.1 2.2-.3 133.2-.7 291.2-.8l287.2-.1.3 95.7zm201.1 104.1c-6.5.1-38.8.1-71.8 0l-60-.3-5.2-2.7c-5.2-2.8-8.4-6.3-11.9-12.8-1.8-3.3-1.9-7.4-2.2-75.5l-.3-72 81.6 81.5 81.5 81.5-11.7.3zm102.3 252.6c101 13.4 179.8 91.9 193.8 193.4 2.1 14.7 2.1 42.4 0 58.4-4.8 37-19.8 74-42.5 104.3-43.1 57.6-108.6 90.6-179.9 90.6-111.4 0-205.7-81.6-222-192.3-2.3-15-2.7-43.7-1-57.3 5.2-40.9 19-75.7 43-108 36-48.5 90.3-80.7 150-89 13.2-1.8 45.1-1.8 58.6-.1zm-53.8 712.8c-.4 12-.9 16.1-2.3 18.8-3.2 6.4-6.6 10-11.8 12.8l-5.2 2.7h-811l-5.2-2.7c-5.2-2.8-8.6-6.4-11.8-12.8-1.4-2.7-1.9-6.8-2.3-18.8l-.5-15.2h850.6l-.5 15.2z'/>
                           <path fill='#002C87' d='M350 525v25h450v-50H350v25zM350 625v25h450v-50H350v25zM350 725v25h350v-50H350v25zM350 825v25h250v-50H350v25zM1190.8 847.7l-65.8 65.8-28.5-28.5-28.5-28.5-18.3 18.3-18.2 18.2 31.5 31.4c28.4 28.2 32.2 31.6 38.7 34.9 9.3 4.6 16.7 6.1 26.8 5.4 9.4-.6 17.1-3.3 25.2-8.7 3.3-2.2 34.3-32.4 72.8-70.9l67-67.1-18-18c-9.9-9.9-18.2-18-18.5-18-.3 0-30.1 29.6-66.2 65.7z'/>
                         </svg>
                         : null}
        {type === 'file'
          ? <div className={styles.fileDescription}>
            <div className={styles.descriptionField}><b>Name:</b> {value}</div>
            <div className={styles.descriptionField}><b>Size:</b> {size}</div>
          </div>
          : <TextField label='statement'
                       className={styles.statementInput}
                       value={value}
                       onChange={this.onFieldChange}
                       type='textarea'
                       placeholder='Enter your statement...'/>}
      </div>
      <img className={styles.removeIcon}
           onClick={onRowRemove}
           src='./static/images/transaction-rejected.svg'/>
    </div>);
  }

  onFieldChange = (label, inputState) => {
    this.props.onRowChange(inputState);
  };
}
