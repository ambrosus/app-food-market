import React, {Component} from "react";
import ContextMenu from "../../stateless/ContextMenu/ContextMenu.jsx";
import EthereumTransactionsStatus from "../../stateful/EthereumTransactionsStatus/EthereumTransactionsStatus.jsx";
require('./HeaderContainer.scss');

export default class HeaderContainer extends Component {
    render() {
        return (<div className="header">
            <img className="logo" src="/static/images/logotype.png"/>
            <EthereumTransactionsStatus/>
            <ContextMenu/>
            <hr className="line"/>
        </div>)
    }
}