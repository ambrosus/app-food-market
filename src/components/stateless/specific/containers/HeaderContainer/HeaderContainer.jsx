import React, {Component} from "react";
import ContextMenu from "../../navigation/ContextMenu/ContextMenu";
import {Link} from "react-router-dom";
import Breadcrumbs from "../../navigation/Breadcrumbs/Breadcrumbs";
import styles from './HeaderContainer.scss';
import EthereumTransactionList from "../../../../stateful/EthereumTransactionList/EthereumTransactionList";

export default class HeaderContainer extends Component {
    render() {
        return (<div className={styles.header}>
            <Link className={styles.logo} to="/">
                <img className={styles.logo} src="/static/images/logotype.png"/>
            </Link>
            <EthereumTransactionList />
            <ContextMenu/>
            <hr className={styles.line}/>
            <Breadcrumbs className={styles.breadcrumbs}/>
        </div>)
    }
}
