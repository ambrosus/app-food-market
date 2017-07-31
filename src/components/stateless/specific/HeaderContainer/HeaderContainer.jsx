import React, {Component} from "react";
import ContextMenu from "../ContextMenu/ContextMenu";
import EthereumTransactionList from "../../../stateful/EthereumTransactionList/EthereumTransactionList";
import EthereumTransactionsStatus from "../../../stateful/EthereumTransactionsStatus/EthereumTransactionsStatus";
import {Link} from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import styles from './HeaderContainer.scss';

export default class HeaderContainer extends Component {
    render() {
        return (<div className={styles.header}>
            <Link className="logo" to="/">
            	<img className="logo" src="/static/images/logotype.png"/>
            </Link>
            <EthereumTransactionList/>
            <EthereumTransactionsStatus/>
            <ContextMenu/>
            <hr className="line"/>
            <Breadcrumbs className={styles.breadcrumbs} />
        </div>)
    }
}
