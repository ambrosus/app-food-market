import React, {Component} from "react";
import ProductItem from "../../stateless/ProductItem/ProductItem.jsx";
require('./ProductContainer.scss');

export default class ProductContainer extends Component {
    render() {
        return (<div className="container">
            <ProductItem name="Ale"
                         price="€17/kg"
                         seller="Jan Kowalski"
                         title="Best ale in the world"/>
            <ProductItem name="Stockfish"
                         price="€18/kg"
                         seller="Jan Kowalski"
                         title="Best stockfish in the world"
                         image={'/static/images/anchovies.png'}/>
            <ProductItem name="Trice"
                         price="€19/kg"
                         seller="Jan Kowalski"
                         title="Best trice in the world"
                         image={'/static/images/markel.png'}/>
            <ProductItem name="Trice"
                         price="€19/kg"
                         seller="Jan Kowalski"
                         title="Best trice in the world"
                         image={'/static/images/fish.png'}/>
            <ProductItem name="Trice"
                         price="€19/kg"
                         seller="Jan Kowalski"
                         title="Best trice in the world"
                         image={'/static/images/markel.png'}/>
            <ProductItem name="Trice"
                         price="€19/kg"
                         seller="Jan Kowalski"
                         title="Best trice in the world"
                         image={'/static/images/tuna.png'}/>
            <ProductItem name="Trice"
                         price="€19/kg"
                         seller="Jan Kowalski"
                         title="Best trice in the world"/>
            <ProductItem name="Trice"
                         price="€19/kg"
                         seller="Jan Kowalski"
                         title="Best trice in the world"/>
        </div>)
    }
}