import React, { Component } from 'react';
import ProductContainer from './stateful/ProductContainer/ProductContainer.jsx';
import NavigationBar from './stateless/NavigationBar/NavigationBar.jsx';
import PageContainer from "./stateless/PageContainer/PageContainer.jsx";
import Header from "./stateless/Header/Header.jsx";
import ContextMenu from './stateless/ContextMenu/ContextMenu.jsx';

require('./RootComponent.scss');

export default class RootComponent extends Component {
    render() {
        return (
            <PageContainer>
                <Header>
                    <img className="logo" src="/static/images/logotype.png" />
                    <ContextMenu></ContextMenu>
                </Header>
                <NavigationBar/>
                <ProductContainer/>
            </PageContainer>)
    }
}