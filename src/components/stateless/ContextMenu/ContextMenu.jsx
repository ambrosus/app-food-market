import React, {Component} from "react";
require('./ContextMenu.scss');

export default class ContextMenu extends Component {

    render() {
        return (<div className="context-menu">
            <ul className="context-menu__list">
                <li className="context-menu__element">Market</li>
                <li className="context-menu__element">My orders</li>
                <li className="context-menu__element">Profile</li>
            </ul>
        </div>)
    }
}