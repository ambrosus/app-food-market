import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './CreateOfferPage.scss';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import { Link } from 'react-router-dom';
import TextField from '../../../generic/TextField/TextField';
import SelectorField from '../../../generic/SelectorField/SelectorField';
import InputField from '../../../generic/InputField/InputField';
import AttributeValueFieldContainer from '../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';
import AttributeValueField from '../../containers/AttributeValueFieldContainer/AttributeValueField';
import FileProcessor from 'react-file-processor';
import Label from '../../../generic/Label/Label.jsx';
import Button from '../../../generic/Button/Button.jsx';

const parameters = [
  { field: 'Origin', value: 'Norway' },
  { field: 'Seller', value: 'Johnston Ltd.' },
  { field: 'Anti-Biotics Free', value: 'Yes' },
  { field: 'Method of Fishing', value: 'Line' },
  { field: 'Fresh/ Frozen', value: 'Fresh' },
  { field: 'Fresh/ Frozen', value: 'Fresh' },
  { field: 'Wild/ Aquaculture', value: 'Wild' },
  { field: 'Temperature', value: '0-4 Celsius' },
];

class CreateOfferPage extends Component {

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string),
    qualities: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    categories: ['None'],
    qualities: ['None', 'Value'],
  };

  constructor(props) {
    super(props);
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

  getOfferData() {
    let result = {};
    return result;
  }

  onSaveClick() {
    this.props.onAdd(this.getOfferData(), this.image, this.props.address);
  };

  getCategories() {
    return this.props.categories.map((key) => ({ value: key }));
  }

  getQualities() {
    const qualities = this.props.qualities.length > 0 ? this.props.qualities : CreateOfferPage.defaultProps.qualities;
    return qualities.map((key) => ({ value: key }));
  }

  onNameChange(label, state) {
    console.log(label, state);
  }

  onCategorySelected(label, state) {
    console.log(label, state);
  }

  onWeightChange(label, state) {
    console.log(label, state);
  }

  onPriceChange(label, state) {
    console.log(label, state);
  }

  render() {
    return (<div>
        <NavigationBar title='Create an offer'>
          <Button className={styles.cancelButton}
                  onClick={this.props.history.goBack}>Cancel</Button>
          <Button className={styles.saveButton}
                  onClick={() => this.onSaveClick()}>Save</Button>
        </NavigationBar>
        <div className={styles.top}>
          <Label className={styles.label} text='Name of object:'/>
          <TextField label="name" onChange={this.onNameChange.bind(this)} className={styles.textField}/>
          <div className={styles.container}>
            <div className={styles.column}>
              <FileProcessor
                ref='myFileInput'
                onFileSelect={(e, f) => this.onFileSelect(e, f)}>
                <div className={styles.imageContainer} onClick={() => this.onImageClick()}>
                  <div className={styles.verticalContainer}>
                    <div className={styles.horizontalContainer}>
                      <img className={styles.image}
                           src='./static/images/iconImage.png'
                           ref='image'/>
                    </div>
                  </div>
                </div>
              </FileProcessor>
            </div>
            <div className={styles.column}>
              <Label className={styles.label} text='Category:'/>
              <SelectorField className={styles.selector}
                             onChange={this.onCategorySelected.bind(this)}
                             options={this.getCategories()} label='category'/>
              <div className={styles.table}>
                <InputField text='Package weight (kg)' onChange={this.onWeightChange.bind(this)} label='weight'/>
                <InputField text='Price per package (€)' onChange={this.onPriceChange.bind(this)}
                            label='pricePerPackage'/>
              </div>
              <Label className={styles.label} text='Quality standard:'/>
              <SelectorField className={styles.selector}
                             onChange={this.onCategorySelected.bind(this)}
                             options={this.getQualities()}
                             label='quality'/>
              <span className={styles.paragraph}>or
                <Link className={styles.link} to='create-requirements'>create custom requirements</Link>
                for quality</span>
              <AttributeValueFieldContainer className={styles.properties}>
                {parameters.map((element, index) => (
                  <AttributeValueField key={index} field={element.field} value={element.value}/>),
                )}
              </AttributeValueFieldContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateOfferPage;

