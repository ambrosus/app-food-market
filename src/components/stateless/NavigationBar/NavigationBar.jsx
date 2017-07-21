import React, {Component} from "react";
import Button from "../../stateless/Button/Button.jsx";
import EthereumTransactionsStatus from "../../stateful/EthereumTransactionsStatus/EthereumTransactionsStatus.jsx";
require('./NavigationBar.scss');

export default class NavigationBar extends Component {
    render() {
        return (<div className="navigation">
            <span className="navigation__title">Market</span>
            <EthereumTransactionsStatus />
            <Button className='navigation__create-offer-button'>
                <span className="icon-basket-loaded button-icon-default"/><span>Create an offer</span>
            </Button>
        </div>)
    }
}