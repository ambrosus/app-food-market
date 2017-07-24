import React, { Component } from 'react';
import ProductContainer from './stateful/ProductContainer/ProductContainer.jsx';
import NavigationBar from './stateless/NavigationBar/NavigationBar.jsx';
import PageContainer from "./stateless/PageContainer/PageContainer.jsx";
import { Provider } from 'react-redux';
import store from '../redux/reducers/index.js';

import Header from "./stateless/Header/Header.jsx";
import ContextMenu from './stateless/ContextMenu/ContextMenu.jsx';
require('./RootComponent.scss');


export default class RootComponent extends Component {
    render() {
        return (
			<Provider store={store}>
                <PageContainer>
                    <Header>
                        <img className="logo" src="/static/images/logotype.png" />
                        <ContextMenu/>
                        <hr className="line" />
                    </Header>
                    <NavigationBar/>
                    <ProductContainer/>
                </PageContainer>
        	</Provider>)
    }
}