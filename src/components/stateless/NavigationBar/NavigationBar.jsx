import React, {Component} from "react";
import Button from "../../stateless/Button/Button.jsx";
import EthereumTransactionsStatus from "../../stateful/EthereumTransactionsStatus/EthereumTransactionsStatus.jsx";
import TextField from "../TextField/TextField.jsx";
require('./NavigationBar.scss');

export default class NavigationBar extends Component {
    render() {
        return (<div className="navigation">
            <span className="navigation__title">Market</span>            
            <TextField label="Quality" placeholder="Premium" className="navigation__category-selector"/>
            <TextField label="Category" placeholder="Fish" className="navigation__category-selector"/>
            <EthereumTransactionsStatus />
            <Button className='navigation__create-offer-button'>
                <span className="icon-basket-loaded button-icon-default"/>Create an offer</Button>
        </div>)
    }
}