import React, { Component } from "react";
import PropTypes from "prop-types";
import { statusAddPendingTransaction } from '../../../redux/actions/TransactionStatusAction.js';


export default class TransactionsStatus extends Component {

    static propTypes = {
        pending: PropTypes.array.isRequired,
        success: PropTypes.array.isRequired,
        failed: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired
    };

    static defaultProps = {
        pending: [],
        success: [],
        failed: []
    };

    render() {
        return ( < div onClick = { () => this.props.onClick() }>
             { this.props.pending.length }
             { this.props.success.length }
             { this.props.failed.length }
            </div>);
    }
}