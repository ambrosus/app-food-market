import React, {Component} from "react";
import NavigationBar from '../../../stateless/NavigationBar/NavigationBar.jsx';
import ProductContainer from '../../ProductContainer/ProductContainer.jsx';

let MarketPage = () => (
    <div>
        <NavigationBar/>
        <ProductContainer/>
    </div>
);

export default MarketPage;