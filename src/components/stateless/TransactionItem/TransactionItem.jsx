import React, { Component } from "react";
import PropTypes from "prop-types";

export default class TransactionItem extends Component {

    static propTypes = {
        tx: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        url: PropTypes.string,
        errorMessage: PropTypes.string
    };

    static defaultProps = {
        tx: "0x",
        caption: "",
        url: "",
		errorMessage: ""
    };

    render() {
        return ( < li > {this.props.status} {this.props.caption} ({ this.props.tx.substring(0,8)+"..." }) </li>);
    }
}