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
import SelectorField from "../../../stateless/SelectorField/SelectorField.jsx";
import FileProcessor from 'react-file-processor';


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
    constructor(props){
        super(props);
        this.formFields = {};
    }
    
    getOfferData() {
        var result = {};
        for (let i in this.formFields){
            result[i] = this.formFields[i].value;
        }
        return result;
    }

    handleClick(e) {
        console.log(this.refs)
        this.refs.myFileInput.chooseFile();
    }

    handleFileSelect(e, files) {
        this.image = files[0];

        var reader = new FileReader();
        reader.onload = (event) => {
          this.refs.image.src = event.target.result;
        };
        reader.readAsDataURL(files[0]);
    }

    render() {
        const self = this;

        return (<div>
                <NavigationBar title="Create new offer">
                    <Button className={styles.cancelButton}>Cancel</Button>
                    <Button className={styles.saveButton}
                        onClick={(e)=>{
                            this.props.onAdd(
                                this.getOfferData(),
                                this.image,
                                this.props.address)
                        }}>Save</Button>
                </NavigationBar>
                <div className={styles.top}>
                    <TextField className={classNames(styles.name, styles.element)} label="Name of object" 
                        inputRef={el => this.formFields.name = el}/>
                    <div className={styles.container}>
                        <div className={styles.column}>
                            <FileProcessor
                                ref="myFileInput"
                                onFileSelect={(e, f)=>this.handleFileSelect(e,f)}>
                                <div className={styles.imageContainer} onClick={()=>this.handleClick()}>
                                    <div className={styles.verticalContainer}>
                                        <div className={styles.horizontalContainer}>
                                            <img className={styles.image} 
                                                 src="./static/images/icon-image.png"
                                                 ref="image"/>
                                        </div>
                                    </div>
                                </div>
                            </FileProcessor>
                        </div>
                        <div className={styles.column}>
                            <SelectorField/>
                            <div className={styles.table}>
                                <InputField label="Package weight (kg)" inputRef={el => this.formFields.packageWeight = el}/>
                                <InputField label="Price per package (€)" inputRef={el => this.formFields.pricePerUnit = el}/>
                            </div>
                            <AttributeValueFieldContainer>
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

export default CreateOfferPage;

