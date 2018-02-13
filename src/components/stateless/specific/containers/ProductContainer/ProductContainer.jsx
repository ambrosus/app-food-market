import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductItem from '../../pages/ProductPage/ProductItem/ProductItem';
import styles from './ProductContainer.scss';

class ProductContainer extends Component {

  static propTypes = {
    products: PropTypes.array.isRequired,
    moreDetailsAction: PropTypes.func.isRequired,
    moreDetailsPath: PropTypes.string.isRequired,
    getOptions: PropTypes.func.isRequired,
  };

  static defaultProps = {
    products: [],
    moreDetailsAction: () => {},
  };

  render() {
    const {products} = this.props;
    return (
      <div className={styles.container}>
        {products && products.length
          ? this.props.products.map((offer, index) =>
            <ProductItem
              key={`${index} ${offer.address}`}
              category={offer.category}
              offer={offer}
              options={this.props.getOptions(offer)}
              moreDetailsPath={this.props.moreDetailsPath}
              moreDetailsAction={this.props.moreDetailsAction.bind(this, offer)} />)
          : null}
      </div>
    );
  }
}

export default ProductContainer;
