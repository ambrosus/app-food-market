import React, { Component } from "react";
import PropTypes from "prop-types";
require('./Button.scss');

export default class Button extends Component {

    static propTypes = {
        label: PropTypes.string
    };

    static defaultProps = {
        label: 'Default'
    };

    render() {
        return (
            <div className="button" {...this.props}>{this.props.children}</div>)
    }
}