import React, {Component} from "react";
import NavigationBar from "../../../stateless/NavigationBar/NavigationBar.jsx";
import Button from "../../../stateless/Button/Button.jsx";
import { Link } from 'react-router-dom';

class CreatingMarketPage extends Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div>
        <NavigationBar title={this.props.market.status}>
        { this.props.market.address ? (
          <Link className="context-menu__link" to="market" >
            <Button className='navigation__create-offer-button'>
              <span className="icon-basket-loaded button-icon-default"/>Go to market
            </Button>
          </Link>
        ) : "" }
        </NavigationBar>
      </div>
    );
  }
};

export default CreatingMarketPage;