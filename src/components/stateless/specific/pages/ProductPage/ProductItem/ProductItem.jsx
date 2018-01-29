import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../generic/Button/Button';
import { loadImage } from '../../../../../../utils/loadFromIPFS';
import { Link } from 'react-router-dom';
import styles from './ProductItem.scss';
import AttributeValueFieldContainer from
  '../../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';

export default class ProductItem extends Component {

  static propTypes = {
    name: PropTypes.string,
    category: PropTypes.string,
    imageHash: PropTypes.string,
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

  componentDidMount() {
    const {imageHash} = this.props;
    if (imageHash) loadImage(this.refs.image, imageHash);
  }

  render() {
    return (<article className={styles.product}>
      <img src={this.props.image} width='263' height='180' ref='image'/>
      <span className={styles.category}>{this.props.category}</span>
      <div className={styles.info}>
        <h1 className={styles.title}>{this.props.name}</h1>
        <AttributeValueFieldContainer className={styles.fieldsContainer} options={this.props.options}/>
        <Link className={styles.link} to={this.props.moreDetailsPath}>
          <Button onClick={() => this.props.moreDetailsAction(this.props.offer)} className={styles.button}>
            More details
          </Button>
        </Link>
      </div>
    </article>);
  }
};
