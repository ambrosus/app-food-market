import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionNotification.scss';
import classnames from 'classnames';
import moment from 'moment';

export default class TransactionNotification extends Component {

  static CONFIRMED = 'success';
  static PENDING = 'pending';
  static FAILED = 'failed';

  static propTypes = {
    onClick: PropTypes.func,
    notification: PropTypes.shape({
      status: PropTypes.string,
      time: PropTypes.number,
      type: PropTypes.string,
      address: PropTypes.string,
      isRead: PropTypes.bool.isRequired,
    }),
    urlHelper: PropTypes.object,
  };

  static defaultProps = {
    onClick: (e, address) => {
    },

    notification: {
      status: 'Not defined',
      time: 'Not defined',
      type: 'Not defined',
      address: 'Not defined',
      isRead: false,
    },
  };

  render() {
    return (<div onClick={ (e) => this.props.onClick(e, this.props.address) }
                 className={classnames(styles.notification, {
      [styles.unread]: !this.props.notification.isRead,
    })}>
      <div className={classnames(styles.typeIcon, {
        [styles.typeApproved]: this.props.notification.status === TransactionNotification.CONFIRMED,
        [styles.typePending]: this.props.notification.status === TransactionNotification.PENDING,
        [styles.typeNotApproved]: this.props.notification.status === TransactionNotification.FAILED,
      })}/>
      <div className={styles.description}>
        <div className={styles.header}>
          <div className={styles.status}>Status: <span className={classnames(
            styles.statusValue, {
              [styles.approved]: this.props.notification.status === TransactionNotification.CONFIRMED,
              [styles.pending]: this.props.notification.status === TransactionNotification.PENDING,
              [styles.notApproved]: this.props.notification.status === TransactionNotification.FAILED,
            })}>{this.props.notification.status}</span></div>
          <div className={styles.time}>{moment(this.props.notification.time).fromNow()}</div>
        </div>
        <div className={styles.type}>{this.props.notification.type}</div>
        <a className={styles.address} href={`https://kovan.etherscan.io/tx/${this.props.notification.address}`}
target="_blank">
          {this.props.notification.address}
        </a>
      </div>
    </div>);
  }
};
