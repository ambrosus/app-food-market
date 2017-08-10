import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './TransactionsStatus.scss';
import TransactionNotification from './TransationNotification/TransactionNotification';
import ScrollArea from 'react-scrollbar';

export default class TransactionsStatus extends Component {

  static propTypes = {
    notifications: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    stats: PropTypes.object,
  };

  static defaultProps = {
    onClick: () => {
      console.warn('TransactionsStatus didn\'t get onClick');
    },

    stats: {
      pending: 0,
      approved: 0,
      failed: 0,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  toggle() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  over() {
    this.setState({
      tooltip: true,
    });
  }

  out() {
    this.setState({
      tooltip: false,
    });
  }

  render() {
    return (
      <div onMouseEnter={this.over.bind(this)} onMouseLeave={this.out.bind(this)} onClick={this.toggle.bind(this)}
           className={styles.container}>
        <div className={styles.icon}/>
        <div className={classnames(styles.hidden, { [styles.expanded]: this.state.expanded })}>
          {this.props.notifications.length > 0 ?
            <ScrollArea className={styles.scrollableArea}>
              {this.renderNotifications()}
            </ScrollArea> : <div>Empty</div>}
        </div>
        <div className={classnames(styles.tooltip, {
          [styles.tooltipVisible]: this.state.tooltip,
        })}>
          <div className={styles.iconContainer}>
            <div className={styles.pendingIcon}>
              <div
                className={classnames(styles.indicator, styles.indicatorPending)}>{this.props.stats.pending}</div>
            </div>
            <div className={styles.approvedIcon}>
              <div
                className={classnames(styles.indicator, styles.indicatorApproved)}>{this.props.stats.approved}</div>
            </div>
            <div className={styles.notApprovedIcon}>
              <div
                className={classnames(styles.indicator, styles.indicatorNotApproved)}>{this.props.stats.failed}</div>
            </div>
          </div>
        </div>
      </div>);
  }

  renderNotifications() {
    return (this.props.notifications.map((notification, index) => <TransactionNotification
      notification={notification} onClick={this.props.onClick} key={index}/>));
  }
}
