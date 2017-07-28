import React, {Component} from "react";
import styles from "./ProductPage.scss";
import cx from "classnames";
import {Link} from "react-router-dom";
import AttributeValueFieldContainer from "../../../stateless/AttributeValueFieldContainer/AttributeValueFieldContainer";
import AttributeValueField from "../../../stateless/AttributeValueField/AttributeValueField";
import Label from "../../../stateless/Label/Label";
import Button from "../../../stateless/Button/Button";
import MeasurementList from "../../../stateless/MeasurementList/MeasurementList";
import { loadImage } from "../../../../utils/load_from_ipfs.js";

const requirements = [
    {field: 'Anti-Biotics Free', value: 'Yes'},
    {field: 'Method of Fishing', value: 'Line'},
    {field: 'Fresh/ Frozen', value: 'Fresh'},
    {field: 'Wild/ Aquaculture', value: 'Wild'},
    {field: 'Temperature', value: '0-4 Celsius'}
];

const parameters = [
    {field: 'Product', value: 'Atlantic Salmon'},
    {field: 'Origin', value: 'Norway'},
    {field: 'Seller', value: 'Johnston Ltd.'},
];

const summary = [
    {field: 'Status', value: 'In Progress'},
    {field: 'Role', value: 'Buyer'},
    {field: 'Packages', value: '120 Pounds'},
];

class ProductPage extends Component {

    static defaultProps = {
        offer: {
            name: 'Tuna',
            category: 'Fish',
            pricePerUnit: '€20 / kg',
            name: 'Nord atlantic tuna',
            seller: 'Riverscott',
        },
    };

    componentDidMount() {
        loadImage(this.refs.image, this.props.offer.imageHash);
    }


    render() {
        return (<div className={styles.container}>
                <div className={cx(styles.column, styles.requirementsColumn)}>
                    <img className={styles.image} src="./static/images/placeholder.png" ref="image"/>
                    <Label className={styles.subtitle} text="Requirements" />
                    <AttributeValueFieldContainer className={styles.requirements}>
                        {requirements.map((element, index) => (
                            <AttributeValueField key={index} field={element.field} value={element.value}/>)
                        )}
                    </AttributeValueFieldContainer>
                </div>
                <div className={cx(styles.column, styles.typeColumn)}>
                    <Label className={styles.title} text={this.props.offer.name}/>
                <div className={styles.typeColumn}>
                    <Label className={styles.title} text={this.props.offer.name}/>
                    <AttributeValueFieldContainer className={styles.requirements}>
                        {parameters.map((element, index) => (
                            <AttributeValueField key={index} field={element.field} value={element.value}/>)
                        )}
                    </AttributeValueFieldContainer>
                    <Label className={styles.subtitle} text="Measurements"/>
                    <MeasurementList/>
                </div>
                <div className={cx(styles.column, styles.summaryColumn)}>
                    <Label className={styles.title} text="Summary"/>
                    <AttributeValueFieldContainer className={styles.requirements}>
                        {summary.map((element, index) => (
                            <AttributeValueField key={index} field={element.field} value={element.value}/>)
                        )}
                    </AttributeValueFieldContainer>
                    <Button className={styles.approvePayment}>Approve payment</Button>
                    <Button className={styles.reimburse}>Reimbursed</Button>
                </div>
            </div>
        )
    }
}

export default ProductPage;

