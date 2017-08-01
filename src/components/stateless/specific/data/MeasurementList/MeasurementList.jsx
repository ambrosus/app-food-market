import React, {Component} from "react";
import {Link} from "react-router-dom";
import AttributeValueFieldContainer from "../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer";
import Label from "../../../generic/Label/Label";
import styles from './MeasurementList.scss';

export default class MeasurementList extends Component {

    render() {

        let index = 0;

        const inspection = [
            {field: 'Origin', value: 'Norway'},
            {field: 'Type', value: 'Free'},
            {field: 'Method of fishing', value: 'Line'},
        ];

        const loading = [
            {field: 'Weight', value: '20kg'},
        ];

        const transport =  [
            {field: 'Temperature', value: '3.1 C (11:12)'},
        ];

        const unloading =  [
            {field: 'Weight', value: '20kg'},
        ];

        return <div>
            <div className={styles.header}>
                <img type="image/svg+xml" src="./static/images/rectangle.svg" className={styles.icon}/>
                <Label className={styles.title} text="Inspection"/>
                <Label className={styles.date} text="18 Feb 2017"/>
            </div>
            <AttributeValueFieldContainer options={inspection} className={styles.container}/>
            <div className={styles.header}>
                <img type="image/svg+xml" src="./static/images/rectangle.svg" className={styles.icon}/>
                <Label className={styles.title} text="Loading"/>
                <Label className={styles.date} text="18 Feb 2017"/>
            </div>
            <AttributeValueFieldContainer options={loading} className={styles.container} />
            <div className={styles.header}>
                <img type="image/svg+xml" src="./static/images/rectangle.svg" className={styles.icon}/>
                <Label className={styles.title} text="Transport"/>
                <Label className={styles.date} text="18 Feb 2017"/>
            </div>
            <AttributeValueFieldContainer options={transport} className={styles.container} />
            <div className={styles.header}>
                <img type="image/svg+xml" src="./static/images/rectangle.svg" className={styles.icon}/>
                <Label className={styles.title} text="Unloading"/>
                <Label className={styles.date} text="18 Feb 2017"/>
            </div>
            <AttributeValueFieldContainer options={unloading} className={styles.container} />
        </div>
    }
}