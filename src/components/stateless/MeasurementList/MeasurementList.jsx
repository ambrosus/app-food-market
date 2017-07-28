import React, {Component} from "react";
import {Link} from "react-router-dom";
import AttributeValueField from "../AttributeValueField/AttributeValueField";
import AttributeValueFieldContainer from "../AttributeValueFieldContainer/AttributeValueFieldContainer";
import Label from "../Label/Label";
import styles from './MeasurementList.scss';

let index = 0;

export default class MeasurementList extends Component {

    render() {
        return <div>
            <div className={styles.header}>
                <img type="image/svg+xml" src="./static/images/rectangle.svg" className={styles.icon} />
                <Label className={styles.title} text="Inspection"/>
                <Label className={styles.date} text="18 Feb 2017"/>
            </div>
            <AttributeValueFieldContainer className={styles.container}>
                <AttributeValueField key={index++} field={"Origin"} value={"Norway"}/>
                <AttributeValueField key={index++} field={"Type"} value={"Fish"}/>
                <AttributeValueField key={index++} field={"Type"} value={"Free"}/>
                <AttributeValueField key={index++} field={"Method of fishing"} value={"Line"}/>
            </AttributeValueFieldContainer>
            <div className={styles.header}>
                <img type="image/svg+xml" src="./static/images/rectangle.svg" className={styles.icon} />
                <Label className={styles.title} text="Loading"/>
                <Label className={styles.date} text="18 Feb 2017"/>
            </div>
            <AttributeValueFieldContainer className={styles.container}>
                <AttributeValueFieldContainer className={styles.requirements}>
                    <AttributeValueField key={index++} field={"Weight"} value={"20kg"}/>
                </AttributeValueFieldContainer>
            </AttributeValueFieldContainer>
            <div className={styles.header}>
                <img type="image/svg+xml" src="./static/images/rectangle.svg" className={styles.icon} />
                <Label className={styles.title} text="Transport"/>
                <Label className={styles.date} text="18 Feb 2017"/>
            </div>
            <AttributeValueFieldContainer className={styles.container}>
                <AttributeValueFieldContainer className={styles.requirements}>
                    <AttributeValueField key={index++} field={"Temperature"} value={"3.1C"}/>
                </AttributeValueFieldContainer>
            </AttributeValueFieldContainer>
            <div className={styles.header}>
                <img type="image/svg+xml" src="./static/images/rectangle.svg" className={styles.icon} />
                <Label className={styles.title} text="Unloading"/>
                <Label className={styles.date} text="18 Feb 2017"/>
            </div>
            <AttributeValueFieldContainer className={styles.container}>
                <AttributeValueFieldContainer classNa me={styles.requirements}>
                    <AttributeValueField key={index++} field={"Weight"} value={"20kg"}/>
                </AttributeValueFieldContainer>
            </AttributeValueFieldContainer>
        </div>
    }
}