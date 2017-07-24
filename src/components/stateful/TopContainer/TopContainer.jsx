import React, {Component} from "react";
import Header from '../../stateless/Header/Header.jsx';
import ContextMenu from '../../stateless/ContextMenu/ContextMenu.jsx';

let TopContainer = () => (
    <Header>
        <img className="logo" src="/static/images/logotype.png"/>
        <ContextMenu/>
        <hr className="line"/>
    </Header>
);

export default TopContainer;