import React, {Component} from "react";
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './TransactionsStatus.scss';
import TransactionNotification from "./TransationNotification/TransactionNotification";
import ScrollArea from 'react-scrollbar';

export default class TransactionsStatus extends Component {

    static propTypes = {
        notifications: PropTypes.array.isRequired,
        onClick: PropTypes.func
    };

    static defaultTypes = {
        onClick: () => {
            console.warn('TransactionsStatus didn\'t get onClick')
        }
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
                {this.props.notifications.length > 0 ?
                    <ScrollArea className={styles.scrollableArea}>
                        {this.renderNotifications()}
                    </ScrollArea> : <div>Empty</div>}
            </div>
        </div>);
    }

    renderNotifications() {
        return (this.props.notifications.map((notification, index) => <TransactionNotification
            notification={notification} onClick={this.props.onClick} key={index}/>))
    }
}
