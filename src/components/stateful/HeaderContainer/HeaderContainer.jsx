import React, {Component} from "react";
import Header from '../../stateless/Header/Header.jsx';
import ContextMenu from '../../stateless/ContextMenu/ContextMenu.jsx';
import EthereumTransactionsStatus from '../../stateful/EthereumTransactionsStatus/EthereumTransactionsStatus.jsx';

let HeaderContainer = () => (
    <Header>
        <img className="logo" src="/static/images/logotype.png"/>
		<EthereumTransactionsStatus/>
        <ContextMenu/>
        <hr className="line"/>
    </Header>
);

export default HeaderContainer;