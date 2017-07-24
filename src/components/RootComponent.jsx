import React, {Component} from "react";
import ProductContainer from "./stateful/ProductContainer/ProductContainer.jsx";
import NavigationBar from "./stateless/NavigationBar/NavigationBar.jsx";
import PageContainer from "./stateless/PageContainer/PageContainer.jsx";
import Header from "./stateless/Header/Header.jsx";
import ContextMenu from "./stateless/ContextMenu/ContextMenu.jsx";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
require('./RootComponent.scss');

export default class RootComponent extends Component {
    render() {
        return (
            <Router>
                <PageContainer>
                    <Header>
                        <img className="logo" src="/static/images/logotype.png"/>
                        <ContextMenu/>
                        <hr className="line"/>
                    </Header>
                    <Route exact path="/" component={main}/>
                    <Route path="/orders" component={orders}/>
                </PageContainer>
            </Router>
        )
    }
};

let main = () => (
    <div>
        <NavigationBar/>
        <ProductContainer/>
    </div>
);

let orders = () => (
    <div>
        <ProductContainer/>
    </div>
);