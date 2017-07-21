import React, { Component } from 'react';
import ProductContainer from './stateful/ProductContainer/ProductContainer.jsx';
import NavigationBar from './stateless/NavigationBar/NavigationBar.jsx';
import PageContainer from "./stateless/PageContainer/PageContainer.jsx";
import { Provider } from 'react-redux';
import marketApp from '../redux/reducers/index.js';
import { createStore } from 'redux';
require('./RootComponent.scss');



export default class RootComponent extends Component {
    render() {
    	let store = createStore(marketApp);
        return (
			<Provider store={store}>
	            <PageContainer>
	                <NavigationBar/>
	                <ProductContainer/>
	            </PageContainer>
        	</Provider>)
    }
}