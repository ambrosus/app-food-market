import React, {Component} from "react";
import ProductContainer from '../../../stateless/ProductContainer/ProductContainer.jsx';
import NavigationBar from "../../../stateless/NavigationBar/NavigationBar.jsx";

let OrdersPage = () => (
    <div>
        <NavigationBar title="Orders"/>
        <ProductContainer/>
    </div>
);

export default OrdersPage;