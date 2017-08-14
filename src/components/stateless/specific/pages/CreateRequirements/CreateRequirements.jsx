import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import Button from '../../../generic/Button/Button';
import styles from './CreateRequirements.scss';
import Label from '../../../generic/Label/Label';
import validation from 'react-validation-mixin';
import strategy from 'react-validatorjs-strategy';
import ValidatedTextField from '../../../generic/ValidatedTextField/ValidatedTextField';
import CreateRequirementsRow from './CreateRequirementsRow';

class CreateRequirements extends Component {

  constructor(props) {
    super(props);
    this.state = {
      requirements: this.props.requirements,
    };
  };

  static propTypes = {
    requirements: PropTypes.array,
  };

  static defaultProps = {
    requirements: [],
  };

  getValidationMessages() {
    return {
      required: 'This field is required',
      numeric: 'This is not a number',
    };
  }

  onCancel() {
    this.props.history.goBack();
  }

  onSave() {
    console.log('asdf');
  }

  addRow() {
    let requirements = [...this.state.requirements, { hash: Date.now() }];
    this.setState({
      requirements: requirements,
    });
  }

  removeRow(hash) {
    const filtered = this.state.requirements.filter((requirement) => requirement.hash !== hash);
    this.setState({
      requirements: [...filtered],
    });
  }

  render() {
    return (<div>
      <NavigationBar title='Create requirements'>
        <Button className={styles.cancelButton}
                onClick={this.onCancel.bind(this)}>Cancel</Button>
        <Button className={styles.saveButton}
                onClick={this.onSave.bind(this)}>Save</Button>
      </NavigationBar>
      <Label className={styles.label} text='Quality standard name:'/>
      <ValidatedTextField
        className={styles.qualityStandard}
        validate={this.props.handleValidation('name')}
        error={this.props.getValidationMessages('name')}/>
      <Label text='Attributes:' className={styles.section}/>
      <div className={styles.list}>
        {  this.state.requirements.map((element, key) =>
          (<CreateRequirementsRow key={element.hash}
                                  onRemove={()=>this.removeRow(element.hash)} requirement={element} />))
        }
      </div>
      <Button onClick={this.addRow.bind(this)} className={styles.addRequirement}>Add requirement</Button>
    </div>);
  }
}

export default validation(strategy)(CreateRequirements);
