import { Link } from "react-router-dom"
import React, {Component} from "react";
import NavigationBar from "../../../stateless/NavigationBar/NavigationBar.jsx";
import Market from "../../Market.js";

import TextField from "../../../stateless/TextField/TextField.jsx";
import Button from "../../../stateless/Button/Button.jsx";


class MarketPage extends Component {

    constructor(props) {
      super(props);
    }

    componentDidMount() {
      console.log(this);
      this.props.onMount();
    }

    render(){
        return (
            <div>
                <NavigationBar title="Market">
                    <TextField label="Quality" placeholder="Premium" className="navigation__category-selector"/>
                    <TextField label="Category" placeholder="Fish" className="navigation__category-selector"/>
                    <Link className="navigation__link" to="/create-offer"><Button className='navigation__create-offer-button'>
                        <span className="icon-basket-loaded button-icon-default"/>Create an offer</Button>
                    </Link>
                </NavigationBar>
                <Market/>
            </div>
        );
    }
};

export default MarketPage;