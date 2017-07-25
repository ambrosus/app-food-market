import React, { Component } from "react";
import PropTypes from "prop-types";
import TransactionItem from "../TransactionItem/TransactionItem.jsx";

export default class TransactionList extends Component {

    static propTypes = {
        pending: PropTypes.array.isRequired,
        success: PropTypes.array.isRequired,
        failed: PropTypes.array.isRequired
    };

    static defaultProps = {
        pending: [],
        success: [],
        failed: []
    };

    render() {
        return ( < div >
            <ul>
                {this.props.pending.map(item => <TransactionItem key={ item.tx } status="pending" tx={ item.tx } caption={ item.caption } />)}
                {this.props.success.map(item => <TransactionItem key={ item.tx } status="success" tx={ item.tx } caption={ item.caption } />)}
                {this.props.failed.map(item => <TransactionItem key={ item.tx } status="failed" tx={ item.tx } caption={ item.caption } />)}
            </ul> 
            </div>);
    }
}