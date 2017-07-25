import React, {Component} from "react";
import ProductItem from "../ProductItem/ProductItem.jsx";
import PropTypes from 'prop-types';

require('./ProductContainer.scss');


class ProductContainer extends Component {

  componentDidMount() {
    this.props.onMount(this.props.market.address);
  }

  render() {
    var offers = this.props.market.offers;
    
    if (this.props.market.status != null){
      return (<p>{this.props.market.status}</p>)
    }
    return (
      <div className="container">
        {offers.map((offer) => 
          <ProductItem 
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
