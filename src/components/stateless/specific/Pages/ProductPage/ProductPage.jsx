import React, {Component} from "react";
import styles from "./ProductPage.scss";
import cx from "classnames";
import AttributeValueFieldContainer from "../../AttributeValueFieldContainer/AttributeValueFieldContainer";
import Label from "../../../generic/Label/Label";
import MeasurementList from "../../MeasurementList/MeasurementList";
import {loadImage} from "../../../../../utils/loadFromIPFS";

class ProductPage extends Component {

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

        const summary = [
            {field: 'Price', value: `€ ${this.props.offer.pricePerUnit / 100.0} /kg`},
            {field: 'Price per package', value: `€${this.props.offer.pricePerPackage / 100.0}`},
            {field: 'Per package', value: `${this.props.offer.packageWeight / 100.0} kg`},
        ];

        return (<div className={styles.container}>
                <div className={styles.requirementsColumn}>
                    <img className={styles.image} src="./static/images/placeholder.png"
                         srcSet="./static/images/placeholder.png 2x" ref="image"/>
                    <Label className={styles.subtitle} text="Requirements"/>
                    <AttributeValueFieldContainer options={requirements} className={styles.requirements}/>
                </div>
                <div className={styles.typeColumn}>
                    <Label className={styles.title} text={this.props.offer.name}/>
                    <AttributeValueFieldContainer options={parameters} className={styles.requirements}/>
                    <Label className={styles.subtitle} text="Measurements"/>
                    <MeasurementList/>
                </div>
                <div className={cx(styles.column, styles.summaryColumn)}>
                    <Label className={styles.title} text="Buy product"/>
                    <AttributeValueFieldContainer options={summary} className={styles.requirements}/>
                </div>
            </div>
        )
    }
}

export default ProductPage;

