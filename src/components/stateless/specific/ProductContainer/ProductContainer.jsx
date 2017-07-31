import React, { Component } from "react";
import ProductItem from "../ProductItem/ProductItem";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"


require('./ProductContainer.scss');


class ProductContainer extends Component {

  componentDidMount() {
    this.props.onMount(this.props.market.address);
  }

  render() {
    let offers = this.props.offers;
    if (!this.props.market.address) {
      return (<p>Opsss.. No market yet.
                &nbsp;
                <Link className="navigation__link" to="/create-market">
                   Create
                </Link>
                &nbsp; one.
              </p>)
    } else if (this.props.market.status == 'Loading'){
      return (
          <img className="spinner" src="./static/images/spinner.svg"/>
      );
    } 
    else if (this.props.market.offers.length == 0) {
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
        { offers.map((offer, index) => 
                  <ProductItem 
                      key={index}
                      offer={offer}
                      moreDetailsAction={this.props.moreDetailsAction}
                      />)
      }
      </div>
    );
  }
};

export default ProductContainer;
