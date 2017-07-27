import { Link } from "react-router-dom"
import React, {Component} from "react";
import NavigationBar from "../../../stateless/NavigationBar/NavigationBar.jsx";
import Market from "../../Market/Market.js";
import SearchField from "../../../stateless/SearchField/SearchField.jsx";

let MarketPage = () => (
    <div>
        <NavigationBar title="Market">
            <SearchField label="Quality" placeholder="Premium" className="navigation__category-selector"/>
            <SearchField label="Category" placeholder="Fish" className="navigation__category-selector"/>
            <Link className="navigation__link" to="/create-offer">
                Create an offer
            </Link>
        </NavigationBar>
        <Market/>
    </div>
);

export default MarketPage;