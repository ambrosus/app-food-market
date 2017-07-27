import {Link} from "react-router-dom";
import React, {Component} from "react";
import NavigationBar from "../../../stateless/NavigationBar/NavigationBar.jsx";
import Market from "../../Market/Market.js";
import SelectorField from "../../../stateless/SelectorField/SelectorField.jsx";
import Button from "../../../stateless/Button/Button.jsx";
import Label from "../../../stateless/Label/Label.jsx";

let MarketPage = () => (
    <div>
        <NavigationBar title="Market">
            <Label text="Quality"/>
            <SelectorField options={[
                {value: 'Poor'},
                {value: 'Good'}]
            } label="Category"/>
            <Label text="Categories"/>
            <SelectorField options={[
                {value: 'Poor'},
                {value: 'Good'}]
            } label="Category"/>
            <Link className="navigation__link" to="/create-offer"><Button
                className='navigation__create-offer-button'>
                <span className="icon-basket-loaded button-icon-default"/>Create an offer</Button>
            </Link>
        </NavigationBar>
        <Market/>
    </div>
);

export default MarketPage;