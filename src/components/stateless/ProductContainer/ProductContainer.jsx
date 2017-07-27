import React, { Component } from "react";
import ProductItem from "../ProductItem/ProductItem.jsx";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"

require('./ProductContainer.scss');


class ProductContainer extends Component {

  componentDidMount() {
    this.props.onMount(this.props.market.address);
  }

  render() {
    var offers = this.props.market.offers;
    
    if (this.props.market.status != null){
      return (<p>{this.props.market.status}</p>)
    } else if (this.props.market.offers.length == 0) {
      return (<p>There are no offers on the market yet. 
                <Link className="navigation__link" to="/create-offer"><Button className='navigation__create-offer-button'>
                   <span className="icon-basket-loaded button-icon-default"/>Create</Button>
                </Link>
                first.
              </p>)
    }

    return (
      <div className="container">
        {offers.map((offer, index) => 
          <ProductItem 
              key={index}
              name={offer.name}
              price={'€'+offer.pricePerUnit/100.0+'/kg'}
              seller={offer.seller.slice(0,10)+'...'}
              title={'The best ' + offer.name + ' in the world'} 
              />)
      }
      </div>
    );
  }
};

export default ProductContainer;
