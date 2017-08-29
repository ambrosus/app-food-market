import React, { Component } from 'react';
import styles from './BatchList.scss';
import classnames from 'classnames';
import _ from 'lodash';

export default class BatchList extends Component {

  constructor(props) {
    super(props);
  }

  static defaultProps = {};

  renderMeasurements() {
    return _(this.props.measurements)
      .groupBy('batch_id')
      .map((measurements, batchId) => ({
        batchId,
        arrival: _.find(measurements, (m) => m.event_id === 'Arrival'),
      }))
      .map(
        batch => (
          <tr key={batch.batchId}
              onClick={() => this.props.onSelect(batch.batchId)}
              className={styles.row}>
            <td className={styles.cell}>{batch.batchId}</td>
            <td className={styles.cell}>{this.formatArrivalDate(batch)}</td>
            <td className={styles.cell}>{batch.arrival ? 'OK' : ''}</td>
          </tr>))
      .value();
  }

  formatArrivalDate(batch) {
    return batch.arrival
      ? new Date(batch.arrival.timestamp).toLocaleString()
      : 'Shipping';
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
          {this.renderMeasurements()}
          </tbody>
        </table>
      </div>);
  }
}
