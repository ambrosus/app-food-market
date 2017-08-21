import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductItem from '../../pages/ProductPage/ProductItem/ProductItem';
import styles from './ProductContainer.scss';

class ProductContainer extends Component {

  static propTypes = {
    products: PropTypes.array.isRequired,
    moreDetailsAction: PropTypes.func.isRequired,
    moreDetailsPath: PropTypes.string.isRequired,
  };

  static defaultProps = {
    products: [],
    moreDetailsAction: () => {},
  };

  render() {
    return (
      <div className={styles.container}>
        {this.props.products.map((offer, index) =>
          <ProductItem
            key={index}
            name={offer.name}
            category={offer.category}
            imageHash={offer.imageHash}
            options={[{
              field: 'Price',
              value: offer.pricePerUnit,
            }, {
              field: 'Seller',
              value: offer.seller,
            },
            ]}
            moreDetailsPath={this.props.moreDetailsPath}
            moreDetailsAction={this.props.moreDetailsAction.bind(this, offer)} />)}
      </div>
    );
  }
}

export default ProductContainer;
