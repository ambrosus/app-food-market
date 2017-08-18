import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductItem from '../../pages/ProductPage/ProductItem/ProductItem';
import styles from './ProductContainer.scss';

class ProductContainer extends Component {

  static propTypes = {
    products: PropTypes.array,
  };

  static defaultProps = {
    products: [],
  };

  render() {
    return (
      <div className={styles.container}>
        {this.props.products.map((offer, index) =>
          <ProductItem
            key={Date.now()}
            offer={offer}
            moreDetailsAction={this.props.moreDetailsAction}
            buyAction={this.props.buyAction}
          />)}
      </div>
    );
  }
}

export default ProductContainer;
