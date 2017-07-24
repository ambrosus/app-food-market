import React, {Component} from "react";
import NavigationBar from "../../../stateless/NavigationBar/NavigationBar.jsx";
import { Link } from "react-router-dom"
import Button from "../../../stateless/Button/Button.jsx";

let CreateOfferPage = () => (
    <div>
        <NavigationBar title="Create new order">
            <Link className="navigation__link" to="/create-offer"><Button className='navigation__create-offer-button'>
                <span className="icon-basket-loaded button-icon-default"/>Create an offer</Button>
            </Link>
        </NavigationBar>
    </div>
);

export default CreateOfferPage;