import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React, {Component} from "react";
import PageContainer from "./stateless/PageContainer/PageContainer.jsx";
import MarketPage from "./stateful/pages/MarketPage/MarketPage.jsx";
import OrdersPage from "./stateful/pages/OrdersPage/OrdersPage.jsx";
import CreateOfferPage from "./stateful/pages/CreateOfferPage/CreateOfferPage.jsx";
import TopContainer from "./stateful/TopContainer/TopContainer.jsx";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import marketApp from '../redux/reducers/index';
require('./RootComponent.scss');

export default class RootComponent extends Component {
    render() {
    	let store = createStore(marketApp);
        return (
        <Provider store={store}>
            <Router>
                <PageContainer>
                    <TopContainer/>
                    <Route exact path="/" component={MarketPage}/>
                    <Route exact path="/orders" component={OrdersPage}/>
                    <Route exact path="/profile" component={CreateOfferPage}/>
                    <Route exact path="/createOffer" component={CreateOfferPage}/>
                </PageContainer>
            </Router>
        </Provider>)
    }
};