import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './ProductPage.scss';
import cx from 'classnames';
import AttributeValueFieldContainer from '../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';
import Label from '../../../generic/Label/Label';
import MeasurementList from '../../data/MeasurementList/MeasurementList';
import {loadImage} from '../../../../../utils/loadFromIPFS';
import BuyProduct from './BuyProduct/BuyProduct';
import SummaryApprovedProduct from './SummaryApprovedProduct/SummaryApprovedProduct';
import SummaryProduct from './SummaryProduct/SummaryProduct';

class ProductPage extends Component {

    static defaultProps = {
        sidebar: 'summary'
    };

    static propTypes = {
        offer: PropTypes.object,
        sidebar: PropTypes.string
    };

    componentDidMount() {
        loadImage(this.refs.image, this.props.offer.imageHash);
    }

    render() {
        
        const requirements = [
            {field: 'Anti-Biotics Free', value: 'Yes'},
            {field: 'Method of Fishing', value: 'Line'},
            {field: 'Fresh/ Frozen', value: 'Fresh'},
            {field: 'Wild/ Aquaculture', value: 'Wild'},
            {field: 'Temperature', value: '0-4 Celsius'}
        ];

        const parameters = [
            {field: 'Category', value: this.props.offer.category},
            {field: 'Seller', value: this.props.offer.seller},
        ];

        return (<div className={styles.container}>
                <div className={styles.requirementsColumn}>
                    <img className={styles.image} src='./static/images/placeholder.png'
                         srcSet='./static/images/placeholder.png 2x' ref='image'/>
                    <Label className={styles.subtitle} text='Requirements'/>
                    <AttributeValueFieldContainer options={requirements} className={styles.requirements}/>
                </div>
                <div className={styles.typeColumn}>
                    <Label className={styles.title} text={this.props.offer.name}/>
                    <AttributeValueFieldContainer options={parameters} className={styles.info}/>
                    <Label className={styles.subtitle} text='Measurements'/>
                    <MeasurementList/>
                </div>
                <div className={cx(styles.column, styles.summaryColumn)}>
                    { this.props.sidebar === 'summary' && <SummaryProduct/> }
                    { this.props.sidebar === 'progress' && <SummaryApprovedProduct/> }
                    { this.props.sidebar === 'buy' && <BuyProduct offer={this.props.offer} onBuy={this.props.onBuy}/> }
                </div>
            </div>
        )
    }
}

export default ProductPage;

