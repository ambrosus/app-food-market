import {BrowserRouter as Router, Route} from "react-router-dom";
import React, {Component} from "react";
import HeaderContainer from "./stateless/specific/HeaderContainer/HeaderContainer";
import PageContainer from "./stateless/specific/PageContainer/PageContainer";
import FilteredMarketPage from "./stateful/FilteredMarketPage/FilteredMarketPage";
import Welcome from "./stateful/Welcome/Welcome.js";
import CreatingMarketContainer from "./stateless/specific/Pages/CreatingMarketPage/CreatingMarketContainer.js";
import OrdersPage from "./stateless/specific/Pages/OrdersPage/OrdersPage";
import ProfilePage from "./stateless/specific/Pages/ProfilePage/ProfilePage";
import CreateOffer from "./stateful/CreateOffer/CreateOffer.js";
import Product from "./stateful/Product/Product.js";
import {Provider} from "react-redux";
import store from "../redux/stores/store";
import ModalContainer from "./stateless/specific/ModalContainer/ModalContainer.jsx";
import {BrowserHistory} from 'react-history';
import TransactionProgressModal from "./stateless/specific/TransactionProgressModal/TransactionProgressModal";
require("./RootComponent.scss");

export default class RootComponent extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router history={BrowserHistory}>
                    <PageContainer>
                        <HeaderContainer/>
                        <Route exact path="/" component={Welcome}/>
                        <Route exact path="/create-market" component={CreatingMarketContainer}/>
                        <Route exact path="/market" component={FilteredMarketPage}/>
                        <Route exact path="/orders" component={OrdersPage}/>
                        <Route exact path="/profile" component={ProfilePage}/>
                        <Route exact path="/product-info" component={Product}/>
                        <Route exact path="/create-offer" component={CreateOffer}/>
                        <Route exact path="/modal" component={TransactionProgressModal}/>
                        <ModalContainer/>
                    </PageContainer>
                </Router>
            </Provider>)
    }
};