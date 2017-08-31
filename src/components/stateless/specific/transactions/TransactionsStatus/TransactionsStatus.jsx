import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './TransactionsStatus.scss';
import TransactionNotification from './TransationNotification/TransactionNotification';
import ScrollArea from 'react-scrollbar';

export default class TransactionsStatus extends Component {

  static propTypes = {
    notifications: PropTypes.array.isRequired,
    stats: PropTypes.object,
    markAsRead: PropTypes.func,
  };

  static defaultProps = {
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

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.hide();
    }
  };

  toggle() {
    if (this.state.expanded) {
      document.removeEventListener('mousedown', this.handleClickOutside);
    } else {
      document.addEventListener('mousedown', this.handleClickOutside);
    }

    this.setState({
      expanded: !this.state.expanded,
    });
  }

  hide() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    this.setState({
      expanded: false,
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
      <div onMouseEnter={this.over.bind(this)} onMouseLeave={this.out.bind(this)}
           className={styles.container} ref={(div) => this.wrapperRef = div} >
        <div className={styles.iconWrapper} onClick={this.toggle.bind(this)}>
          <div className={styles.icon} />
        </div>
        <div className={classnames(styles.hidden, { [styles.expanded]: this.state.expanded })}>
          {this.props.notifications.length > 0 ? <ScrollArea className={styles.scrollableArea}>
            {this.renderNotifications()}
          </ScrollArea> : <div>Empty</div>}
        </div>
        <div className={classnames(styles.tooltip, {
          [styles.tooltipVisible]: this.state.tooltip,
        })} onClick={this.toggle.bind(this)}>
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
      notification={notification} key={index} onClick={() => this.props.markAsRead(notification.address)}/>));
  }
}
