import React, {Component} from "react";
import PropTypes from "prop-types";
import styles from './TransactionNotification.scss';
import classnames from "classnames";

export default class TransactionNotification extends Component {

    static CONFIRMED = 'success';
    static PENDING = 'pending';
    static FAILED = 'failed';

    static propTypes = {
        onClick: PropTypes.func,
        notification: PropTypes.shape({
            status: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            address: PropTypes.string.isRequired,
            isRead: PropTypes.bool.isRequired
        })
    };

    static defaultProps = {
        onClick: () => {
            console.warn('onClick is not defined')
        },
        notification: {
            status: 'Not defined',
            time: 'Not defined',
            type: 'Not defined',
            address: 'Not defined',
            isRead: false
        }
    };

    render() {

        return (<div onClick={this.props.onClick} className={classnames(styles.notification, {
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
                    <div className={styles.time}>{this.props.notification.time}</div>
                </div>
                <div className={styles.type}>{this.props.notification.type}</div>
                <div className={styles.address}>{this.props.notification.address}</div>
            </div>
        </div>);
    }
}