import React, {Component} from "react";
import { Link } from "react-router-dom";
require('./NavigationBar.scss');

export default class NavigationBar extends Component {
    render() {
        return (<div className="navigation">
            <span className="navigation__title">{ this.props.title } </span>
            { this.props. children }
        </div>)
    }
}