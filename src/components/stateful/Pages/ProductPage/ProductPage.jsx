import React, {Component} from "react";
import styles from "./ProductPage.scss";
import cx from "classnames";
import {Link} from "react-router-dom";
import AttributeValueFieldContainer from "../../../stateless/AttributeValueFieldContainer/AttributeValueFieldContainer.jsx";
import AttributeValueField from "../../../stateless/AttributeValueField/AttributeValueField.jsx";
import Label from "../../../stateless/Label/Label.jsx";

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

    constructor(props) {
        super(props);
        this.formFields = {};
    }

    render() {
        return (<div className={styles.container}>
                <div className={cx(styles.column, styles.requirementsColumn)}>
                    <img className={styles.image} src="./static/images/fish.png"/>
                    <AttributeValueFieldContainer className={styles.requirements}>
                        { requirements.map((element, index) => (
                            <AttributeValueField key={index} field={element.field} value={element.value}/>)
                        ) }
                    </AttributeValueFieldContainer>
                </div>
                <div className={cx(styles.column, styles.typeColumn)}>
                    <Label className={styles.title} text="Champion"/>
                    <AttributeValueFieldContainer className={styles.requirements}>
                        { parameters.map((element, index) => (
                            <AttributeValueField key={index} field={element.field} value={element.value}/>)
                        ) }
                    </AttributeValueFieldContainer>
                </div>
                <div className={cx(styles.column, styles.summaryColumn)}>
                    <Label className={styles.title} text="Summary"/>
                    <AttributeValueFieldContainer className={styles.requirements}>
                        { summary.map((element, index) => (
                            <AttributeValueField key={index} field={element.field} value={element.value}/>)
                        ) }
                    </AttributeValueFieldContainer>
                </div>
            </div>
        )
    }
}

export default ProductPage;

