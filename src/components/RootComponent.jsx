import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React, {Component} from "react";
import PageContainer from "./stateless/PageContainer/PageContainer.jsx";
import MarketPage from "./stateful/Pages/MarketPage/MarketPage.jsx";
import OrdersPage from "./stateful/Pages/OrdersPage/OrdersPage.jsx";
import ProfilePage from "./stateful/Pages/ProfilePage/ProfilePage.jsx";
import CreateOfferPage from "./stateful/Pages/CreateOfferPage/CreateOfferPage.jsx";
import HeaderContainer from "./stateful/HeaderContainer/HeaderContainer.jsx";
import {Provider} from "react-redux";
import store from "../redux/reducers/index.js";
import getAllOffers from "../redux/actions/MarketAction.js";
require("./RootComponent.scss");

export default class RootComponent extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <PageContainer>
                        <HeaderContainer/>
                        {/*<Route exact path="/" component={MarketPage} {()=>store.dispatch(getAllOffers(store.getState().address))}/>*/}
                        <Route exact path="/" render={(props) => 
                            <MarketPage onMount={()=>store.dispatch(getAllOffers(store.getState().address))}/>} />
                        <Route exact path="/orders" component={OrdersPage}/>
                        <Route exact path="/profile" component={ProfilePage}/>
                        <Route exact path="/create-offer" component={CreateOfferPage}/>
                    </PageContainer>
                </Router>
            </Provider>)
    }
};