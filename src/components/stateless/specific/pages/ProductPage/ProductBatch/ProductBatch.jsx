import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductBatch.scss';
import { loadImage } from '../../../../../../utils/loadFromIPFS';

class ProductBatch extends Component {

  static defaultProps = {
    sidebar: 'summary',
  };

  static propTypes = {
    offer: PropTypes.object.isRequired,
    sidebar: PropTypes.string.isRequired,
    requirements: PropTypes.array.isRequired,
  };

  componentDidMount() {
    loadImage(this.refs.image, this.props.offer.imageHash);
    this.props.getAttributes(this.props.offer.requirementsAddress);
  }

  render() {
    return (<div className={styles.container}>Hello World</div>);
  }
}

export default ProductBatch;

