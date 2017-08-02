import {BrowserRouter as Router, Route} from "react-router-dom";
import React, {Component} from "react";
import HeaderContainer from "./stateless/specific/containers/HeaderContainer/HeaderContainer";
import PageContainer from "./stateless/specific/containers/PageContainer/PageContainer";
import FilteredMarketPage from "./stateful/FilteredMarketPage/FilteredMarketPage";
import Welcome from "./stateful/Welcome/Welcome.js";
import CreatingMarketContainer from "./stateless/specific/pages/CreatingMarketPage/CreatingMarketContainer.js";
import OrdersPage from "./stateless/specific/pages/OrdersPage/OrdersPage";
import ProfilePage from "./stateless/specific/pages/ProfilePage/ProfilePage";
import CreateOffer from "./stateful/CreateOffer/CreateOffer.js";
import {Provider} from "react-redux";
import store from "../redux/stores/store";
import ModalContainer from "./stateless/specific/containers/ModalContainer/ModalContainer";
import {BrowserHistory} from 'react-history';
import CreateRequirements from "./stateless/specific/pages/CreateRequirements/CreateRequirements";
import styles from "./RootComponent.scss";
import Product from "./stateful/Product/Product";

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
                        <Route exact path="/product" component={Product}/>
                        <Route exact path="/product-info" component={Product}/>
                        <Route exact path="/create-offer" component={CreateOffer}/>
                        <Route exact path="/create-requirements" component={CreateRequirements}/>
                        <ModalContainer/>
                    </PageContainer>
                </Router>
            </Provider>)
    }
};