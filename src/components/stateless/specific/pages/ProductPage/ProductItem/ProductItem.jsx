import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../generic/Button/Button';
import { Link } from 'react-router-dom';
import styles from './ProductItem.scss';
import AttributeValueFieldContainer from
  '../../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';

export default class ProductItem extends Component {

  static propTypes = {
    offer: PropTypes.object.isRequired,
    category: PropTypes.string,
    options: PropTypes.array.isRequired,
    moreDetailsAction: PropTypes.func.isRequired,
    moreDetailsPath: PropTypes.string.isRequired,
  };

  static defaultProps = {
    image: '/static/images/placeholder.png',
    name: '',
    category: '',
    moreDetailsAction: () => {
      console.warn('Warning: More details action is not defined');
    },
  };


  render() {
    const { offer, options, category, moreDetailsPath, moreDetailsAction } = this.props;
    const { origin, name } = offer;
    return (<article className={styles.product}>
      <img src={origin ? `https://amb.482.solutions/files/asset/${origin}` : '/static/images/placeholder.png'}
           width='263'
           height='180'/>
      <span className={styles.category}>{category}</span>
      <div className={styles.info}>
        <h1 className={styles.title}>{name}</h1>
        <AttributeValueFieldContainer className={styles.fieldsContainer} options={options}/>
        <Link className={styles.link} to={moreDetailsPath}>
          <Button onClick={() => moreDetailsAction(offer)} className={styles.button}>
            More details
          </Button>
        </Link>
      </div>
    </article>);
  }
};
