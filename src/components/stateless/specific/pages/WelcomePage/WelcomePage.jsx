import React, {Component} from "react";
import NavigationBar from "../../navigation/NavigationBar/NavigationBar";
import {Link} from 'react-router-dom';
import Button from "../../../generic/Button/Button";
import TextField from "../../../generic/TextField/TextField";
import {createBrowserHistory} from "history";
import Label from "../../../generic/Label/Label";

class WelcomePage extends Component {

    render() {
        window.his1 = createBrowserHistory();
        window.his2 = this.props.history;
        return (
            <div>
                <NavigationBar title="Welcome">
                    <Link className="navigation__link" to="/create-market">
                        <Button className='navigation__create-offer-button'>
                            Create new market
                        </Button>
                    </Link>
                </NavigationBar>
                <Label text="Enter address of a market:"/>
                <TextField label="Market address" inputRef={el => this.addressField = el}/>
                <Button className='navigation__create-offer-button'
                        onClick={(e) => this.props.goOnClick(this.addressField.value)}> Go </Button>
            </div>)
    }
}

export default WelcomePage;
