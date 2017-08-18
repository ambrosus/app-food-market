import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductItem from '../../pages/ProductPage/ProductItem/ProductItem';
import styles from './ProductContainer.scss';

class ProductContainer extends Component {

  static propTypes = {
    products: PropTypes.array,
    moreDetailsAction: PropTypes.func.isRequired,
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
            offer={offer}
            moreDetailsAction={this.props.moreDetailsAction} />)}
      </div>
    );
  }
}

export default ProductContainer;
