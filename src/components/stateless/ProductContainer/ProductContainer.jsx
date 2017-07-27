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
    if (!this.props.market.address) {
      return (<p>Opsss.. No market yet.
                &nbsp;
                <Link className="navigation__link" to="/create-market">
                   Create
                </Link>
                &nbsp; one.
              </p>)
    } else if (this.props.market.offers.length == 0) {
      return (<p>There are no offers on the market yet. 
                &nbsp;
                <Link className="navigation__link" to="/create-offer">
                   Create
                </Link>
                &nbsp; first.
              </p>)
    }

    return (
      <div className="container">
        {offers.map((offer, index) => 
          <ProductItem 
              key={index}
              category={offer.category}
              price={'€'+offer.pricePerUnit/100.0+'/kg'}
              seller={offer.seller.slice(0,10)+'...'}
              title={offer.name} 
              hash={offer.imageHash}
              />)
      }
      </div>
    );
  }
};

export default ProductContainer;
