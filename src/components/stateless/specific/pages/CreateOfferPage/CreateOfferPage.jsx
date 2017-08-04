import React, {Component} from "react";
import styles from "./CreateOfferPage.scss";
import NavigationBar from "../../navigation/NavigationBar/NavigationBar";
import {Link} from "react-router-dom";
import TextField from "../../../generic/TextField/TextField";
import SelectorField from "../../../generic/SelectorField/SelectorField";
import InputField from "../../../generic/InputField/InputField";
import AttributeValueFieldContainer from "../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer";
import AttributeValueField from "../../containers/AttributeValueFieldContainer/AttributeValueField";
import FileProcessor from "react-file-processor";
import Label from "../../../generic/Label/Label.jsx";
import validation from 'react-validation-mixin';
import strategy from 'react-validatorjs-strategy'; 
import Button from "../../../generic/Button/Button.jsx";


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

    constructor(props) {
        super(props);
        this.validatorTypes = strategy.createSchema(
            // Rules
            {
                name: "required|min:3|max:30",
                price: "numeric",
                weight: "numeric"
            }, 
            // Messages
            {
                "required.name": "You must specify the product name",
                "min.name": "Name must be not shorter than 3",
                "max.name": "Name must be not longer than 30",
                "numeric": "This is not a number",
            }
        );
        this.getValidatorData = this.getValidatorData.bind(this);

        this.formFields = {};
    }

    getValidatorData() {
        return {
            name: this.formFields.name.value,
            price: this.formFields.pricePerUnit.value,
            weight: this.formFields.packageWeight.value
        };
    }

    getOfferData() {
        let result = {};
        for (let i in this.formFields) {
            result[i] = this.formFields[i].value;
        }
        return result;
    }

    onImageClick(e) {
        this.refs.myFileInput.chooseFile();
    }

    onFileSelect(e, files) {
        if (!files[0]) return;
        this.image = files[0];
        let reader = new FileReader();
        reader.onload = (event) => {
            this.refs.image.src = event.target.result;
        };
        reader.readAsDataURL(files[0]);
    }

    onSaveClick() {
        this.props.validate((err) => {
            if (err)
                return;
            this.props.onAdd(
              this.getOfferData(),
              this.image,
              this.props.address);
        });
    }

    getCategories() {
        return this.props.categories.map( (key) => { return {value: key } } )
    }

    render() {
        return (<div>
                <NavigationBar title="Create an offer">
                    <Button className={styles.cancelButton}
                            onClick={ this.props.history.goBack }>Cancel</Button>       
                    <Button className={styles.saveButton}
                            onClick={()=>this.onSaveClick()}>Save</Button>
                </NavigationBar>      

                <div className={styles.top}>
                    <Label className={styles.label} text="Name of object:"/>
                    <TextField className={styles.textField} 
                               inputRef={el => this.formFields.name = el}
                               validate={this.props.handleValidation('name')}
                               error={this.props.getValidationMessages('name')}/>
                    <div className={styles.container}>
                        <div className={styles.column}>
                            <FileProcessor
                                ref="myFileInput"
                                onFileSelect={(e, f) => this.onFileSelect(e, f)}>
                                <div className={styles.imageContainer} onClick={() => this.onImageClick()}>
                                    <div className={styles.verticalContainer}>
                                        <div className={styles.horizontalContainer}>
                                            <img className={styles.image}
                                                 src="./static/images/iconImage.png"
                                                 ref="image"/>
                                        </div>
                                    </div>
                                </div>
                            </FileProcessor>
                        </div>
                        <div className={styles.column}>
                            <Label className={styles.label} text="Category:"/>
                            <SelectorField className={styles.selector}
                                           options={ this.getCategories() } label="Category"
                                           inputRef={el => this.formFields.category = el}/>
                            <div className={styles.table}>
                                <InputField label="Package weight (kg)"
                                            inputRef={el => this.formFields.packageWeight = el}
                                            validate={this.props.handleValidation('weight')}
                                            error={this.props.getValidationMessages('weight')}/>
                                <InputField label="Price per package (€)"
                                            inputRef={el => this.formFields.pricePerUnit = el}
                                            validate={this.props.handleValidation('price')}
                                            error={this.props.getValidationMessages('price')}/>
                            </div>
                            <Label className={styles.label} text="Quality standard:"/>
                            <SelectorField className={styles.selector} options={
                                    this.props.qualities.map(name => {return {value: name}})
                                } 
                                label="Category"/>
                            <span className={styles.paragraph }>or <Link to="create-requirements">create custom requirements</Link> for quality</span>
                            <AttributeValueFieldContainer className={styles.properties}>
                                { parameters.map((element, index) => (
                                    <AttributeValueField key={index} field={element.field} value={element.value}/>)
                                ) }
                            </AttributeValueFieldContainer>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default validation(strategy)(CreateOfferPage);

