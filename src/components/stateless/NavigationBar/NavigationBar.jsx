import React, {Component} from "react";
import Button from "../../stateless/Button/Button.jsx";
import TextField from "../TextField/TextField.jsx";
import { Link } from "react-router-dom";
require('./NavigationBar.scss');

export default class NavigationBar extends Component {
    render() {
        return (<div className="navigation">
            <span className="navigation__title">Market</span>            
            <TextField label="Quality" placeholder="Premium" className="navigation__category-selector"/>
            <TextField label="Category" placeholder="Fish" className="navigation__category-selector"/>
            <Link className="navigation__link" to="/create-offer"><Button className='navigation__create-offer-button'>
                <span className="icon-basket-loaded button-icon-default"/>Create an offer</Button>
            </Link>
        </div>)
    }
}