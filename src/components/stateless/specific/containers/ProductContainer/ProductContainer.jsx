import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductItem from '../../pages/ProductPage/ProductItem/ProductItem';
import { Link } from 'react-router-dom';
import styles from './ProductContainer.scss';

class ProductContainer extends Component {

  static propTypes = {
    offers: PropTypes.array,
    market: PropTypes.shape({
      address: PropTypes.string,
      status: PropTypes.string,
    }),
    detailsPath: PropTypes.string,
  };

  static defaultProps = {
    offers: [],
    detailsPath: '/product-buy',
  };

  componentDidMount() {
    this.props.onMount(this.props.market.address);
  }

  render() {
    let offers = this.props.offers;
    if (!this.props.market.address) {
      return (<p>Opsss.. No market yet.
        <Link to='/create-market'>
          Create
        </Link> one.
      </p>);
    } else if (this.props.market.status === 'Loading') {
      return (
        <img className={styles.spinner} src='./static/images/spinner.svg'/>
      );
    } else if (this.props.market.offers.length === 0) {
      return (<p>There are no offers on the market yet. <Link to='/create-offer'>Create</Link> first.</p>);
    }

    return (
      <div className={styles.container}>
        {offers.map((offer, index) =>
          <ProductItem
            key={offer.address}
            offer={offer}
            options={this.props.childrenData(offer)}
            detailsPath={this.props.detailsPath}
            moreDetailsAction={this.props.moreDetailsAction}
            buyAction={this.props.buyAction}
          />)}
      </div>
    );
  }
}

export default ProductContainer;
