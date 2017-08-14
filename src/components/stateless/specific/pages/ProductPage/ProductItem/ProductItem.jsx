import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../generic/Button/Button';
import { loadImage } from '../../../../../../utils/loadFromIPFS';
import { Link } from 'react-router-dom';
import styles from './ProductItem.scss';

export default class ProductItem extends Component {

  static propTypes = {
    name: PropTypes.string,
    price: PropTypes.string,
    seller: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    moreDetailsAction: PropTypes.func.isRequired,
    buyAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    image: '/static/images/placeholder.png',
    moreDetailsAction: () => {
      console.warn('Warning: More details action is not defined');
    },

    buyAction: () => {
      console.warn('Warning: Buy action is not defined');
    },
  };

  componentDidMount() {
    loadImage(this.refs.image, this.props.offer.imageHash);
  }

  render() {
    const { category, name, pricePerUnit, seller } = this.props.offer;
    return (<article className={styles.product}>
      <img src={this.props.image} width='263' height='180' ref='image'/>
      <span className={styles.category}>{category}</span>
      <div className={styles.info}>
        <h1 className={styles.title}>{name}</h1>
        <div className={styles.fieldsContainer}>
          <span className={styles.productLabel}>Price:</span>
          <span className={styles.productValue}>{'€' + pricePerUnit / 100.0 + '/kg'}</span>
          <span className={styles.productLabel}>Seller:</span>
          <span className={styles.productValue}>{seller.slice(0, 10) + '...'}</span>
        </div>
        <Link className={styles.link} to='/product-buy'>
          <Button onClick={() => this.props.buyAction(this.props.offer)} className={styles.button}>
            More details
          </Button>
        </Link>
      </div>
    </article>);
  }
};
