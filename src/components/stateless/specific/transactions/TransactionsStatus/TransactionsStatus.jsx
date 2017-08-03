import React, {Component} from "react";
import classnames from 'classnames';
import styles from './TransactionsStatus.scss';
import TransactionNotification from "./TransationNotification/TransactionNotification";

export default class TransactionsStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    toggle() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        const notifications = [
            {
                id: 1,
                status: TransactionNotification.APPROVED,
                type: 'Transaction',
                address: '0x31a998d51f26c79001380b13814e1f2',
                time: '5 sec ago',
                isRead: true
            },
            {
                id: 2,
                status: TransactionNotification.PENDING,
                type: 'Transaction',
                address: '0x31a998d51f26c79001380b13814e1f2',
                time: '5 sec ago',
                isRead: false
            },
            {
                id: 3,
                status: TransactionNotification.NOT_APPROVED,
                type: 'Created New Requirement',
                address: '0x31a998d51f26c79001380b13814e1f2',
                time: '5 sec ago',
                isRead: false
            },
            {
                id: 4,
                status: TransactionNotification.APPROVED,
                type: 'Transaction',
                address: '0x31a998d51f26c79001380b13814e1f2',
                time: '5 sec ago',
                isRead: true
            },
            {
                id: 5,
                status: TransactionNotification.APPROVED,
                type: 'Transaction',
                address: '0x31a998d51f26c79001380b13814e1f2',
                time: '5 sec ago',
                isRead: true
            },
            {
                id: 6,
                status: TransactionNotification.APPROVED,
                type: 'Transaction',
                address: '0x31a998d51f26c79001380b13814e1f2',
                time: '5 sec ago',
                isRead: true
            }
        ];

        return ( <div onClick={this.toggle.bind(this)} className={styles.container}>
            <div className={styles.icon}/>
            <div className={classnames(styles.hidden, {[styles.visible]: this.state.expanded})}>
                {notifications.map((notification, index) => (
                    <TransactionNotification key={index} notification={notification}/>
                ))}
            </div>
        </div>);
    }
}