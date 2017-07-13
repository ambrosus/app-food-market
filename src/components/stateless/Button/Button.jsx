import React, { Component } from "react";
import PropTypes from "prop-types";
require('./Button.css');

export default class Button extends Component {

    static propTypes = {
        label: PropTypes.string
    };

    static defaultProps = {
        label: 'Default'
    };

    render() {
        return (
            <a {...this.props}>{this.props.children}</a>)
    }
}