import React, { Component } from 'react';
import styles from './BatchList.scss';
import classnames from 'classnames';
import _ from 'lodash';

export default class BatchList extends Component {

  constructor(props) {
    super(props);
  }

  static defaultProps = {};

  formatMeasurements() {
    return _(this.props.measurements)
      .groupBy('batch_id')
      .map((value, key) => ({ key, value, arrival: _.find(value, (v) => v.event_id === 'Arrival') }))
      .map(
        gr => (
          <tr key={gr.key}
              onClick={() => this.props.onSelect(gr.key)}
              className={styles.row}>
            <td className={styles.cell}>{gr.key}</td>
            <td className={styles.cell}>{gr.arrival
              ? new Date(gr.arrival.timestamp).toLocaleString()
              : 'Shipping'}</td>
            <td className={styles.cell}>{gr.arrival ? 'OK' : ''}</td>
          </tr>))
      .value();
  }

  render() {

    return (
      <div className={styles.typeColumn}>
        <table className={styles.table}>
          <tbody>
          <tr className={classnames(styles.row, styles.header)}>
            <th className={styles.cell}>Batch</th>
            <th className={styles.cell}>Arrival date</th>
            <th className={styles.cell}>Status</th>
          </tr>
          {this.formatMeasurements()}
          </tbody>
        </table>
      </div>);
  }
}
