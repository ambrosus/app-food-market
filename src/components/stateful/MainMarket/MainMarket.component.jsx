import React, {Component} from "react";
import ProductItem from "../../stateless/ProductItem/ProductItem.component.jsx";

export default class MainMarket extends Component {
    render() {
        return (<div>
            <ProductItem
                name="Salmon"
                price="€25/kg"
                seller="Jan Kowalski"
                title="Best salmon in the world"
                image={'/public/images/tuna.png'}
            />
            <ProductItem name="Ale"
                         price="€17/kg"
                         seller="Jan Kowalski"
                         title="Best ale in the world"
                         image={'/public/images/anchovies.png'}/>
            <ProductItem name="Stockfish"
                         price="€18/kg"
                         seller="Jan Kowalski"
                         title="Best stockfish in the world"
                         image={'/public/images/salmon.png'}/>
            <ProductItem name="Trice"
                         price="€19/kg"
                         seller="Jan Kowalski"
                         title="Best trice in the world"
                         image={'/public/images/markel.png'}/>
        </div>)
    }
}