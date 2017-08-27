import React, { Component } from 'react';
import styles from './BatchList.scss';

export default class BatchList extends Component {

  render() {
    return (
      <div className={styles.typeColumn}>
        <table className={styles.table}>
          <tr className={styles.row}>
            <th>Batch</th>
            <th>Arrival date</th>
            <th>Status</th>
          </tr>
          <tr className={styles.row}>
            <td>423</td>
            <td>11-08-2017</td>
            <td>OK</td>
          </tr>
          <tr className={styles.row}>
            <td>424</td>
            <td>11-08-2017</td>
            <td>OK</td>
          </tr>
          <tr className={styles.row}>
            <td>425</td>
            <td>11-08-2017</td>
            <td>OK</td>
          </tr>
        </table>
      </div>
    )
  }
}
