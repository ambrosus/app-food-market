import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import Button from '../../../generic/Button/Button';
import styles from './CreateRequirements.scss';
import Label from '../../../generic/Label/Label';
import validation from 'react-validation-mixin';
import strategy from 'react-validatorjs-strategy';
import ValidatedTextField from '../../../generic/ValidatedTextField/ValidatedTextField';
import CreateRequirementsForm from './CreateRequirementsForm';
import CreateRequirementsRow from './CreateRequirementsRow';

class CreateRequirements extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      rows: [],
    };
  };

  onCancel() {
    this.props.history.goBack();
  }

  onSave() {
    console.log(this.state.rows);
  }

  addRow() {
    let key = Date.now().toString();
    let element = (<CreateRequirementsRow key={key}
                                          onRemove={this.removeRow.bind(this, key)} />);
    this.setState({
      rows: [...this.state.rows, element],
    });
  }

  removeRow(key) {
    const filtered = this.state.rows.filter((row) => row.key !== key);
    this.setState({
      rows: [...filtered],
    });
  }

  onNameChange() {
    this.setState({
      name: this.refs.name.state.value,
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
        ref="name"
        onChange={this.onNameChange.bind(this)}
        className={styles.qualityStandard}
        validate={this.props.handleValidation('name')}
        error={this.props.getValidationMessages('name')}/>
      <Label text='Attributes:' className={styles.section}/>
      <CreateRequirementsForm className={styles.list}>
        {  this.state.rows.map((row) => row) }
      </CreateRequirementsForm>
      <Button onClick={this.addRow.bind(this)} className={styles.addRequirement}>Add requirement</Button>
    </div>);
  }
}

export default validation(strategy)(CreateRequirements);
