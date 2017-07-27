import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React, {Component} from "react";
import HeaderContainer from "./stateful/HeaderContainer/HeaderContainer.jsx";
import PageContainer from "./stateless/PageContainer/PageContainer.jsx";
import MarketPage from "./stateful/Pages/MarketPage/MarketPage.jsx";
import WelcomePage from "./stateful/Pages/WelcomePage/WelcomePage.jsx";
import CreatingMarketContainer from "./stateful/Pages/CreatingMarketPage/CreatingMarketContainer.js";
import OrdersPage from "./stateful/Pages/OrdersPage/OrdersPage.jsx";
import ProfilePage from "./stateful/Pages/ProfilePage/ProfilePage.jsx";
import CreateOffer from "./stateful/CreateOffer/CreateOffer.js";
import ProductPage from "./stateful/Pages/ProductPage/ProductPage.jsx";
import {Provider} from "react-redux";
import store from "../redux/reducers/index.js";
require("./RootComponent.scss");

export default class RootComponent extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <PageContainer>
                        <HeaderContainer/>
                        <Route exact path="/" component={WelcomePage}/>
                        <Route exact path="/create-market" component={CreatingMarketContainer}/>
                        <Route exact path="/market" component={MarketPage}/>
                        <Route exact path="/orders" component={OrdersPage}/>
                        <Route exact path="/profile" component={ProfilePage}/>
                        <Route exact path="/product-page" component={ProductPage}/>
                        <Route exact path="/create-offer" component={CreateOffer}/>
                    </PageContainer>
                </Router>
            </Provider>)
    }
};