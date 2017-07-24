import React, { Component } from 'react';
import ProductContainer from './stateful/ProductContainer/ProductContainer.jsx';
import Market from './stateful/Market.js';
import NavigationBar from './stateless/NavigationBar/NavigationBar.jsx';
import PageContainer from "./stateless/PageContainer/PageContainer.jsx";
import { Provider } from 'react-redux';
import marketApp from '../redux/reducers/index.js';
import { createStore } from 'redux';
import Header from "./stateless/Header/Header.jsx";
import ContextMenu from './stateless/ContextMenu/ContextMenu.jsx';
require('./RootComponent.scss');



export default class RootComponent extends Component {
    render() {
    	let store = createStore(marketApp);
        return (
			<Provider store={store}>
                <PageContainer>
                    <Header>
                        <img className="logo" src="/static/images/logotype.png" />
                        <ContextMenu/>
                        <hr className="line" />
                    </Header>
                    <NavigationBar/>
                    <Market/>
                </PageContainer>
        	</Provider>)
    }
}