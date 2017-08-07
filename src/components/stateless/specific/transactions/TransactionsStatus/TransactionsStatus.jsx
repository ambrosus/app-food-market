import React, {Component} from "react";
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './TransactionsStatus.scss';
import TransactionNotification from "./TransationNotification/TransactionNotification";

export default class TransactionsStatus extends Component {

    static propTypes = {
        notifications: PropTypes.array.isRequired
    };

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
        return ( <div onClick={this.toggle.bind(this)} className={styles.container}>
            <div className={styles.icon}/>
            <div className={classnames(styles.hidden, {[styles.visible]: this.state.expanded})}>
                {this.props.notifications.length > 0 ? this.renderNotifications() : <div>Empty</div>}
            </div>
        </div>);
    }

    renderNotifications() {
        return this.props.notifications.map((notification, index) => <TransactionNotification
            notification={notification} key={index}/>)
    }
}
