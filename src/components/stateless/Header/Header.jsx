import React, {Component} from "react";
require('./Header.scss');

export default class HeaderContainer extends Component {
    render() {
        return (<div {...this.props} className="header">{this.props.children}</div>)
    }
}