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

    expand() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        const notifications = [
            {
                status: TransactionNotification.APPROVED,
                type: 'Transaction',
                address: '0x31a998d51f26c79001380b13814e1f2',
                time: '5 sec ago'
            },
            {
                status: TransactionNotification.NOT_APPROVED,
                type: 'Created New Requirement',
                address: '0x31a998d51f26c79001380b13814e1f2',
                time: '5 sec ago'
            },
            {
                status: TransactionNotification.PENDING,
                type: 'Transaction',
                address: '0x31a998d51f26c79001380b13814e1f2',
                time: '5 sec ago'
            },
            {
                status: 'Approved',
                type: 'Transaction',
                address: '0x31a998d51f26c79001380b13814e1f2',
                time: '5 sec ago'
            }
        ];

        return ( <div onClick={this.expand.bind(this)} className={styles.container}>
            <div className={styles.icon}/>
            <div className={classnames(styles.normal, {[styles.expanded]: this.state.expanded})}>
                {notifications.map((notification, index) => (
                    <TransactionNotification key={index} notification={notification}/>
                ))}
            </div>
        </div>);
    }
}