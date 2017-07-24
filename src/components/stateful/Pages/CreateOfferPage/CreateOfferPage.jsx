import React, {Component} from "react";
import NavigationBar from "../../../stateless/NavigationBar/NavigationBar.jsx";
import { Link } from "react-router-dom"
import Button from "../../../stateless/Button/Button.jsx";
require("./CreateOfferPage.scss");

class CreateOfferPage extends Component {
    render() {
        return (<div>
            <NavigationBar title="Create new offer">
                <Button className="navigation__cancel-button">Cancel</Button>
                <Button className="navigation__save-button">Save</Button>
            </NavigationBar>
        </div>)
    }
}

export default CreateOfferPage;