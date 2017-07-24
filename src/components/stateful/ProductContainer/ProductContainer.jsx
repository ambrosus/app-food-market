import React, {Component} from "react";
import ProductItem from "../../stateless/ProductItem/ProductItem.jsx";

require('./ProductContainer.scss');


const ProductContainer = ({offers}) => {
  console.log(offers)
  if (!offers)
    return null;
  if (typeof offers === 'string'){
    return (<div>{offers}</div>)
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
};

export default ProductContainer;
