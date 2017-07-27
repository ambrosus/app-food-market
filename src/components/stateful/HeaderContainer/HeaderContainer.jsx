import React, {Component} from "react";
import ContextMenu from "../../stateless/ContextMenu/ContextMenu.jsx";
import EthereumTransactionList from '../../stateful/EthereumTransactionList/EthereumTransactionList.jsx';
import EthereumTransactionsStatus from "../../stateful/EthereumTransactionsStatus/EthereumTransactionsStatus.jsx";
import { Link } from "react-router-dom"
import Breadcrumbs from "../../stateless/Breadcrumbs/Breadcrumbs.jsx";
require('./HeaderContainer.scss');

export default class HeaderContainer extends Component {
    render() {
        return (<div className="header">
            <Link className="logo" to="/">
            	<img className="logo" src="/static/images/logotype.png"/>
            </Link>
            <EthereumTransactionList/>
            <EthereumTransactionsStatus/>
            <ContextMenu/>
            <hr className="line"/>
            <Breadcrumbs/>
        </div>)
    }
}
