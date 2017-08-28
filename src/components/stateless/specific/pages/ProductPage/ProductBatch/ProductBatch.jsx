import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductBatch.scss';
import cx from 'classnames';
import AttributeValueFieldContainer
  from '../../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';
import Label from '../../../../generic/Label/Label';
import { loadImage } from '../../../../../../utils/loadFromIPFS';
import MeasurementList from '../../../data/MeasurementList/MeasurementList';
import BatchList from '../BatchList/BatchList';

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
    this.props.getAttributes(this.props.offer.requirementsAddress, this.props.offer.measurementsAddress);

  }

  render() {

    const parameters = [
      { field: 'Product', value: 'Salmon Atlantic' },
      { field: 'Origin', value: 'Norway' },
      { field: 'Price per package', value: '70 €' },
      { field: 'Per package', value: '2 kg.' },
      { field: 'Per package', value: '35 € / kg.' },
    ];

    const requirements = [
      { field: 'Anti-Biotics Free', value: 'Yes' },
      { field: 'Method of fishing', value: 'Line' },
      { field: 'Fresh/Frozen', value: 'Fresh' },
      { field: 'Wild/Aquaculture', value: 'Wild.' },
      { field: 'Temperature', value: '0-4 °C' },
    ];

    return (<div className={styles.container}>
        <div className={styles.requirementsColumn}>
          <img className={styles.image} src='./static/images/placeholder.png'
               srcSet='./static/images/placeholder.png 2x' ref='image'/>
          <Label className={styles.title} text={this.props.offer.name}/>
          <AttributeValueFieldContainer options={parameters}/>
          <Label className={styles.subtitle} text='Requirements:'/>
          <AttributeValueFieldContainer options={requirements}/>
        </div>
        <div className={styles.typeColumn}>
          <BatchList/>
        </div>
        <div className={cx(styles.column, styles.summaryColumn)}>
          <Label className={styles.title} text={'Batch 423'}/>
          <MeasurementList measurements={this.props.offer.measurements}/>
        </div>
      </div>
    );
  }
}

export default ProductBatch;
