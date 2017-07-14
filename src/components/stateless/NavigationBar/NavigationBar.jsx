import React, {Component} from "react";
import Button from "../../stateless/Button/Button.jsx";
require('./NavigationBar.scss');

export default class NavigationBar extends Component {

    render() {
        return (<div className="navigation">
            <Button className='create-offer-button'>
                <span className="icon-basket-loaded button-icon-default"/><span>Create an offer</span>
            </Button>
        </div>)
    }
}