import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductPage.scss';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import AttributeValueFieldContainer from '../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';
import Label from '../../../generic/Label/Label';
import MeasurementList from '../../data/MeasurementList/MeasurementList';
import { loadImage } from '../../../../../utils/loadFromIPFS';
import BuyProduct from './BuyProduct/BuyProduct';
import SummaryApprovedProduct from './SummaryApprovedProduct/SummaryApprovedProduct';
import SummaryProduct from './SummaryProduct/SummaryProduct';

class ProductPage extends Component {

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
    this.props.getAttributes(this.props.offer);
  }

  attributesToValueField() {
    return this.props.requirements.map(attribute => {
      const min = attribute.min.toFixed(attribute.decimals);
      const max = attribute.max.toFixed(attribute.decimals);
      return {
        field: attribute.id,
        value: `${min} – ${max}`,
      };
    });
  }

  render() {
    const parameters = [
      { field: 'Category', value: this.props.offer.category },
      { field: 'Seller', value: this.props.offer.seller },
    ];

    return (<div className={styles.container}>
        <div className={styles.requirementsColumn}>
          <img className={styles.image} src='./static/images/placeholder.png'
               srcSet='./static/images/placeholder.png 2x' ref='image'/>
          <Label className={styles.subtitle} text='Requirements'/>
          <Label text={this.props.offer.quality}/>
          <AttributeValueFieldContainer options={this.attributesToValueField()}
                                        className={styles.requirements}/>
        </div>
        <div className={styles.typeColumn}>
          <Label className={styles.title} text={this.props.offer.name}/>
          <AttributeValueFieldContainer options={parameters} className={styles.info}/>
          <Link className={styles.link} to="create-measurements">
            <Label className={styles.subtitle} text='Measurements'/>
          </Link>
          <MeasurementList measurements={this.props.offer.measurements}/>
        </div>
        <div className={cx(styles.column, styles.summaryColumn)}>
          {this.props.sidebar === 'summary' && <SummaryProduct offer={this.props.offer}
                                                               onApprove={this.props.approve}
                                                               onReimburse={this.props.reject}
                                                               history={this.props.history}
                                                               decimals={this.props.decimals}/>}
          {this.props.sidebar === 'progress' && <SummaryApprovedProduct offer={this.props.offer}
                                                                        onReorder={this.props.reorder}
                                                                        decimals={this.props.decimals}/>}
          {this.props.sidebar === 'buy' && <BuyProduct offer={this.props.offer} onBuy={this.props.onBuy}
                                                       decimals={this.props.decimals}/>}
        </div>
      </div>
    );
  }
}

export default ProductPage;

