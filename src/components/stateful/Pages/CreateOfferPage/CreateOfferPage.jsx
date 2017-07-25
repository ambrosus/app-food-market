import React, {Component} from "react";
import classNames from "classnames";
import NavigationBar from "../../../stateless/NavigationBar/NavigationBar.jsx";
import {Link} from "react-router-dom";
import Button from "../../../stateless/Button/Button.jsx";
import TextField from "../../../stateless/TextField/TextField.jsx";
import InputField from "../../../stateless/InputField/InputField.jsx";
import styles from "./CreateOfferPage.scss";
import AttributeValueFieldContainer from "../../../stateless/AttributeValueFieldContainer/AttributeValueFieldContainer.jsx";
import AttributeValueField from "../../../stateless/AttributeValueField/AttributeValueField.jsx";

const parameters = [
    {field: 'Origin', value: 'Norway'},
    {field: 'Seller', value: 'Johnston Ltd.'},
    {field: 'Anti-Biotics Free', value: 'Yes'},
    {field: 'Method of Fishing', value: 'Line'},
    {field: 'Fresh/ Frozen', value: 'Fresh'},
    {field: 'Fresh/ Frozen', value: 'Fresh'},
    {field: 'Wild/ Aquaculture', value: 'Wild'},
    {field: 'Temperature', value: '0-4 Celsius'}
];

class CreateOfferPage extends Component {
    render() {
        return (<div>
                <NavigationBar title="Create new offer">
                    <Button className={styles.cancelButton}>Cancel</Button>
                    <Button className={styles.saveButton}>Save</Button>
                </NavigationBar>
                <TextField className={classNames(styles.name, styles.element)} label="Name of object"/>
                <div className={styles.container}>
                    <div className={styles.column}>
                        <div className={styles.imageContainer}>
                            <div className={styles.verticalContainer}>
                                <div className={styles.horizontalContainer}>
                                    <img className={styles.image}
                                         src="./static/images/icon-image.png"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <InputField label="Package weight (kg)"/>
                        <InputField label="Price per package (€)"/>
                        <AttributeValueFieldContainer>
                            { parameters.map((element, index) => (
                                <AttributeValueField key={index} field={element.field} value={element.value}/>)
                            ) }
                        </AttributeValueFieldContainer>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateOfferPage;

