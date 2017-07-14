import React, { Component } from 'react';
import ProductContainer from './stateful/ProductContainer/ProductContainer.jsx';
import NavigationBar from './stateless/NavigationBar/NavigationBar.jsx';
import PageContainer from "./stateless/PageContainer/PageContainer.jsx";
require('./RootComponent.scss');

export default class RootComponent extends Component {
    render() {
        return (
            <PageContainer>
                <NavigationBar/>
                <ProductContainer/>
            </PageContainer>)
    }
}