import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React, {Component} from "react";
import PageContainer from "./stateless/PageContainer/PageContainer.jsx";
import MarketPage from "./stateful/pages/MarketPage/MarketPage.jsx";
import OrdersPage from "./stateful/pages/OrdersPage/OrdersPage.jsx";
import CreateOfferPage from "./stateful/pages/CreateOfferPage/CreateOfferPage.jsx";
import TopContainer from "./stateful/TopContainer/TopContainer.jsx";
require('./RootComponent.scss');

export default class RootComponent extends Component {
    render() {
        return (
            <Router>
                <PageContainer>
                    <TopContainer/>
                    <Route exact path="/" component={MarketPage}/>
                    <Route exact path="/orders" component={OrdersPage}/>
                    <Route exact path="/profile" component={CreateOfferPage}/>
                    <Route exact path="/createOffer" component={CreateOfferPage}/>
                </PageContainer>
            </Router>
        )
    }
};