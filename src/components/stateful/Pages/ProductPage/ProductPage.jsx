import React, {Component} from "react";
import styles from "./ProductPage.scss";
import cx from "classnames";
import {Link} from "react-router-dom";
import AttributeValueFieldContainer from "../../../stateless/AttributeValueFieldContainer/AttributeValueFieldContainer";
import Label from "../../../stateless/Label/Label";
import Button from "../../../stateless/Button/Button";
import MeasurementList from "../../../stateless/MeasurementList/MeasurementList";


class ProductPage extends Component {

    constructor(props) {
        super(props);
        this.formFields = {};
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
            {field: 'Product', value: 'Atlantic Salmon'},
            {field: 'Origin', value: 'Norway'},
            {field: 'Seller', value: 'Johnston Ltd.'},
        ];

        const summary = [
            {field: 'Status', value: 'In Progress'},
            {field: 'Role', value: 'Buyer'},
            {field: 'Packages', value: '120 Pounds'},
        ];

        return (<div className={styles.container}>
                <div className={styles.requirementsColumn}>
                    <img className={styles.image} src="./static/images/fish.png"/>
                    <Label className={styles.subtitle} text="Requirements"/>
                    <AttributeValueFieldContainer options={requirements} className={styles.requirements} />
                </div>
                <div className={styles.typeColumn}>
                    <Label className={styles.title} text="Champion"/>
                    <AttributeValueFieldContainer options={parameters} className={styles.requirements}/>
                    <Label className={styles.subtitle} text="Measurements"/>
                    <MeasurementList/>
                </div>
                <div className={cx(styles.column, styles.summaryColumn)}>
                    <Label className={styles.title} text="Summary"/>
                    <AttributeValueFieldContainer options={summary} className={styles.requirements}/>
                    <Button className={styles.approvePayment}>Approve payment</Button>
                    <Button className={styles.reimburse}>Reimbursed</Button>
                </div>
            </div>
        )
    }
}

export default ProductPage;

