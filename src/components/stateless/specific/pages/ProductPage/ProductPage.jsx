import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './ProductPage.scss';
import cx from 'classnames';
import AttributeValueFieldContainer from '../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';
import Label from '../../../generic/Label/Label';
import MeasurementList from '../../data/MeasurementList/MeasurementList';
import { loadImage } from '../../../../../utils/loadFromIPFS';
import BuyProduct from './BuyProduct/BuyProduct';
import SummaryApprovedProduct from './SummaryApprovedProduct/SummaryApprovedProduct';
import SummaryProduct from './SummaryProduct/SummaryProduct';
import { fetchAttributes } from '../../../../../redux/actions/AttributesAction.js';
import { resetSelectedOffer } from '../../../../../redux/actions/OfferAction';

const mapStateToProps = state => ({
  requirements: state.requirementsAttributes,
});

const mapDispatchToProps = (dispatch) => ({
  getAttributes: (attributesAddress) => {
    dispatch(fetchAttributes(attributesAddress));
  },

  reset: () => {
    dispatch(resetSelectedOffer());
  },

});

class ProductPage extends Component {

  static defaultProps = {
    sidebar: 'summary',
  };

  static propTypes = {
    offer: PropTypes.object,
    sidebar: PropTypes.string,
    requirements: PropTypes.array,
  };

  componentDidMount() {
    loadImage(this.refs.image, this.props.offer.imageHash);
    this.props.getAttributes(this.props.offer.requirementsAddress);
  }

  attributesToValueField() {
    return this.props.requirements.map(attribute => {
      const min = (attribute.min / (10 ** attribute.decimals)).toFixed(attribute.decimals);
      const max = (attribute.max / (10 ** attribute.decimals)).toFixed(attribute.decimals);
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
          <Label className={styles.subtitle} text='Measurements'/>
          <MeasurementList/>
        </div>
        <div className={cx(styles.column, styles.summaryColumn)}>
          {this.props.sidebar === 'summary' && <SummaryProduct offer={this.props.offer}
                                                               onApprove={this.props.approve}
                                                               onReimburse={this.props.reject}
                                                               history={this.props.history}/>}
          {this.props.sidebar === 'progress' && <SummaryApprovedProduct offer={this.props.offer}
                                                                        onReorder={this.props.reorder}/>}
          {this.props.sidebar === 'buy' && <BuyProduct offer={this.props.offer} onBuy={this.props.onBuy}/>}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);

