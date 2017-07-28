import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React, {Component} from "react";
import HeaderContainer from "./stateful/HeaderContainer/HeaderContainer";
import PageContainer from "./stateless/PageContainer/PageContainer";
import MarketPage from "./stateful/Pages/MarketPage/MarketPage";
import Welcome from "./stateful/Welcome/Welcome.js";
import CreatingMarketContainer from "./stateful/Pages/CreatingMarketPage/CreatingMarketContainer.js";
import OrdersPage from "./stateful/Pages/OrdersPage/OrdersPage";
import ProfilePage from "./stateful/Pages/ProfilePage/ProfilePage";
import CreateOffer from "./stateful/CreateOffer/CreateOffer.js";
import ProductPage from "./stateful/Pages/ProductPage/ProductPage";
import {Provider} from "react-redux";
import store from "../redux/reducers/index.js";
import styles from "./RootComponent.scss";

export default class RootComponent extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <PageContainer>
                        <HeaderContainer/>
                        <Route exact path="/" component={Welcome}/>
                        <Route exact path="/create-market" component={CreatingMarketContainer}/>
                        <Route exact path="/market" component={MarketPage}/>
                        <Route exact path="/orders" component={OrdersPage}/>
                        <Route exact path="/profile" component={ProfilePage}/>
                        <Route exact path="/product-info" component={ProductPage}/>
                        <Route exact path="/create-offer" component={CreateOffer}/>
                    </PageContainer>
                </Router>
            </Provider>)
    }
};