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
    batchInfoAction: PropTypes.func.isRequired,
    batchInfoPath: PropTypes.string.isRequired,
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
            key={offer.address}
            name={offer.name}
            category={offer.category}
            imageHash={offer.imageHash}
            options={this.props.getOptions(offer)}
            batchInfoAction={this.props.batchInfoAction.bind(this, offer)}
            batchInfoPath={this.props.batchInfoPath}
            moreDetailsPath={this.props.moreDetailsPath}
            moreDetailsAction={this.props.moreDetailsAction.bind(this, offer)} />)}
      </div>
    );
  }
}

export default ProductContainer;
