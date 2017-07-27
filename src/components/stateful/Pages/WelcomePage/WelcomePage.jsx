import React, {Component} from "react";
import NavigationBar from "../../../stateless/NavigationBar/NavigationBar.jsx";
import { Link } from 'react-router-dom';
import Button from "../../../stateless/Button/Button.jsx";
import InputField from "../../../stateless/InputField/InputField.jsx";


class WelcomePage extends Component {
    
    render() {
        return (
        <div>
            <NavigationBar title="Welcome">        
                <Link className="navigation__link" to="/create_market">
                	<Button className='navigation__create-offer-button'>
                    	<span className="icon-basket-loaded button-icon-default"/>Create new market
                    </Button>
                </Link>
            </NavigationBar>        
    		
    		<h1> Go to exisiting market: </h1>

    		<InputField label="Market address" />
    		<Link className="context-menu__link" to="/market/">Go</Link>		
        </div>)
    }
}

export default WelcomePage;
