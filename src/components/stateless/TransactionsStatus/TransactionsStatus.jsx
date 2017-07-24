import React, { Component } from "react";
import PropTypes from "prop-types";


export default class TransactionsStatus extends Component {

    static propTypes = {
        pending: PropTypes.array.isRequired,
        successful: PropTypes.array.isRequired,
        failed: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired
    };

    static defaultProps = {
        pending: [],
        successful: [],
        failed: []
    };

    render() {
        return ( < div onClick = { () => this.props.onClick() }>
             { this.props.pending.length }
             { this.props.successful.length }
             { this.props.failed.length }
            </div>);
    }
}