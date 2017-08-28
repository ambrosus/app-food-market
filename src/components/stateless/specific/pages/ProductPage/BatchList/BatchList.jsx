import React, { Component } from 'react';
import styles from './BatchList.scss';
import classnames from 'classnames';

export default class BatchList extends Component {

  constructor(props) {
    super(props);
  }

  static defaultProps = {};

  onRowClick(rowId) {
    console.log(rowId);
  }

  render() {

    const rows = [{
      number: 423,
      deliveryDate: '11-08-2017',
      deliveryStatus: 'OK',
    }, {
      number: 424,
      deliveryDate: '12-08-2017',
      deliveryStatus: 'OK',
    }, {
      number: 425,
      deliveryDate: '13-08-2017',
      deliveryStatus: 'OK',
    }, {
      number: 426,
      deliveryDate: '14-08-2017',
      deliveryStatus: 'OK',
    }, {
      number: 427,
      deliveryDate: '15-08-2017',
      deliveryStatus: 'OK',
    },
    ];

    return (
      <div className={styles.typeColumn} ref="asdf">
        <table className={styles.table} >
          <tr className={classnames(styles.row, styles.header)}>
            <th>Batch</th>
            <th>Arrival date</th>
            <th>Status</th>
          </tr>
          <tbody>
          { rows.map((row)=>(<tr key={row.number} onClick={this.onRowClick.bind(this, row.number)}
                                 className={styles.row}>
            <td className={styles.cell}>{row.number}</td>
            <td className={styles.cell}>{row.deliveryDate}</td>
            <td className={styles.cell}>{row.deliveryStatus}</td>
          </tr>)) }
          </tbody>
        </table>
      </div>);
  }
}
