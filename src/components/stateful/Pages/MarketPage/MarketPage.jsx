import { Link } from "react-router-dom"
import React, {Component} from "react";
import NavigationBar from "../../../stateless/NavigationBar/NavigationBar.jsx";
import ProductContainer from "../../ProductContainer/ProductContainer.jsx";
import TextField from "../../../stateless/TextField/TextField.jsx";
import Button from "../../../stateless/Button/Button.jsx";

let MarketPage = () => (
    <div>
        <NavigationBar title="Market">
            <TextField label="Quality" placeholder="Premium" className="navigation__category-selector"/>
            <TextField label="Category" placeholder="Fish" className="navigation__category-selector"/>
            <Link className="navigation__link" to="/create-offer"><Button className='navigation__create-offer-button'>
                <span className="icon-basket-loaded button-icon-default"/>Create an offer</Button>
            </Link>
        </NavigationBar>
        <ProductContainer/>
    </div>
);

export default MarketPage;