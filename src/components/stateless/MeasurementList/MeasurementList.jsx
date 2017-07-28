import React, {Component} from "react";
import {Link} from "react-router-dom";
import styles from "./MeasurementList.scss";
import AttributeValueField from "../AttributeValueField/AttributeValueField";
import AttributeValueFieldContainer from "../AttributeValueFieldContainer/AttributeValueFieldContainer";
import Label from "../Label/Label";

const measurements = [];
let index = 0;

export default class MeasurementList extends Component {

    render() {
        return <div>
            <Label text="Inspection"/>
            <AttributeValueFieldContainer>
                <AttributeValueFieldContainer className={styles.requirements}>
                    <AttributeValueField key={index++} field={"Origin"} value={"Norway"}/>
                    <AttributeValueField key={index++} field={"Type"} value={"Fish"}/>
                    <AttributeValueField key={index++} field={"Type"} value={"Free"}/>
                    <AttributeValueField key={index++} field={"Method of fishing"} value={"Line"}/>
                </AttributeValueFieldContainer>
            </AttributeValueFieldContainer>
            <Label text="Loading"/>
            <AttributeValueFieldContainer>
                <AttributeValueFieldContainer className={styles.requirements}>
                    <AttributeValueField key={index++} field={"Origin"} value={"Norway"}/>
                    <AttributeValueField key={index++} field={"Type"} value={"Fish"}/>
                    <AttributeValueField key={index++} field={"Type"} value={"Free"}/>
                    <AttributeValueField key={index++} field={"Method of fishing"} value={"Line"}/>
                </AttributeValueFieldContainer>
            </AttributeValueFieldContainer>
            <Label text="Transport"/>
            <AttributeValueFieldContainer>
                <AttributeValueFieldContainer className={styles.requirements}>
                    <AttributeValueField key={index++} field={"Origin"} value={"Norway"}/>
                    <AttributeValueField key={index++} field={"Type"} value={"Fish"}/>
                    <AttributeValueField key={index++} field={"Type"} value={"Free"}/>
                    <AttributeValueField key={index++} field={"Method of fishing"} value={"Line"}/>
                </AttributeValueFieldContainer>
            </AttributeValueFieldContainer>
            <Label text="Unloading"/>
            <AttributeValueFieldContainer>
                <AttributeValueFieldContainer className={styles.requirements}>
                    <AttributeValueField key={index++} field={"Origin"} value={"Norway"}/>
                    <AttributeValueField key={index++} field={"Type"} value={"Fish"}/>
                    <AttributeValueField key={index++} field={"Type"} value={"Free"}/>
                    <AttributeValueField key={index++} field={"Method of fishing"} value={"Line"}/>
                </AttributeValueFieldContainer>
            </AttributeValueFieldContainer>
        </div>
    }
}