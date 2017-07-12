import React, {Component} from "react";
import ProductItem from "../../stateless/ProductItem/ProductItem.component.jsx";

export default class MainMarket extends Component {
    render() {
        return (<div>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
        </div>)
    }
}