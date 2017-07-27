import React, {Component} from "react";
import NavigationBar from "../../../stateless/NavigationBar/NavigationBar.jsx";
import { Link } from 'react-router-dom';
import Button from "../../../stateless/Button/Button.jsx";
import InputField from "../../../stateless/InputField/InputField.jsx";
import TextField from "../../../stateless/TextField/TextField.jsx";

class WelcomePage extends Component {
    
    render() {
        return (
        <div>
            <NavigationBar title="Welcome">        
                <Link className="navigation__link" to="/create-market">
                	<Button className='navigation__create-offer-button'>
                    	Create new market
                    </Button>
                </Link>
            </NavigationBar>        
    		
    		<h1> Enter address of a market: </h1>

    		<TextField label="Market address" inputRef={el => this.addressField = el}/> 
            <br/>
            <br/>
            <Button className='navigation__create-offer-button' onClick={ (e) => this.props.goOnClick(this.addressField.value) }> Go </Button>
        </div>)
    }
}

export default WelcomePage;
