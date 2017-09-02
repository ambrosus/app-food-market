import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import Button from '../../../generic/Button/Button';
import styles from './CreateRequirements.scss';
import Label from '../../../generic/Label/Label';
import validation from 'react-validation-mixin';
import strategy from 'react-validatorjs-strategy';
import CreateRequirementsForm from './CreateRequirementsForm';
import CreateRequirementsRow from './CreateRequirementsRow';
import TextField from '../../../generic/TextField/TextField';
import _ from 'lodash';
import ReactFileReader from 'react-file-reader';

class CreateRequirements extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showValidation: true,
      name: '',
      rows: [],
      requirements: {
      },
      errors: {
        name: [],
      },
    };
  };

  static propTypes = {
    address: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.requirementsForm) {
      this.fillRequirementsForm(this.props.requirementsForm);
      this.props.reset();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.requirementsForm) {
      this.fillRequirementsForm(nextProps.requirementsForm);
      this.props.reset();
    }
  }

  onCancel() {
    this.props.history.goBack();
  }

  onSave() {
    if (this.getTotalNumberOfErrors() === 0) {

      let requirements = _(this.state.requirements)
        .values()
        .map(requirement=>requirement.values)
        .value();

      this.props.onSave(this.state.name, requirements, this.props.address);

    } else {
      let newState = Object.assign({}, this.state, { showValidation: true });
      this.setState(newState);
    }
  }

  uploadCSV(files) {
    this.props.uploadCSV(files[0]);
  };

  fillRequirementsForm(defaultForm) {
    let rows = [];
    let form = {};
    for (let formRow of defaultForm) {
      let key = _.uniqueId();
      let element = (<CreateRequirementsRow key={key}
                                            {...formRow}
                                            deviceList={this.props.deviceList}
                                            showValidation={true}
                                            onRowChange={this.onRowChange.bind(this, key)}
                                            onRowRemove={this.onRowRemove.bind(this, key)}/>);
      form[key] = formRow;
      rows = [...rows, element];
    }

    this.setState({ rows, form });
  }

  getTotalNumberOfErrors() {
    let formErrors = _.chain(this.state.errors)
      .values()
      .flattenDeep()
      .value();

    return _.chain(this.state.requirements)
      .values()
      .map((requirement)=>_.values(requirement.errors))
      .flattenDeep()
      .concat(formErrors)
      .size()
      .value();
  }

  addRow() {
    let key = Date.now().toString();
    let element = (<CreateRequirementsRow key={key}
                                          showValidation={this.state.showValidation}
                                          onRowChange={this.onRowChange.bind(this, key)}
                                          onRowRemove={this.onRowRemove.bind(this, key)} />);
    let formClone = Object.assign({}, this.state.requirements);
    formClone[key] = {};
    this.setState({
      rows: [...this.state.rows, element],
      requirements: formClone,
    });
  }

  onRowChange(key, state) {
    this.setState({
      requirements: Object.assign(this.state.requirements, { [key]: state }),
    });
  }

  onRowRemove(key) {
    const filtered = this.state.rows.filter((row) => row.key !== key);
    let formClone = Object.assign({}, this.state.requirements);
    delete formClone[key];
    this.setState({
      rows: [...filtered],
      requirements: formClone,
    });
  }

  onNameChange(label, state) {

    let newErrors = {
      [label]: this.handleValidation(label, state.value),
    };

    let newValues = {
      [label]: state.value,
    };

    let errors = Object.assign({}, this.state.errors, newErrors);
    let values = Object.assign({}, this.state, newValues);

    let newState = Object.assign({}, this.state, values, {
      errors: errors,
    });

    this.setState(newState);
  }

  handleValidation(label, value) {
    let errors = [];

    switch (label) {
      case 'name':
        if (value === null || value === '') {
          return [...errors, 'Cannot be empty'];
        } else return errors;
        break;
      default:
        return errors;
    }
  }

  render() {
    return (<div>
      <NavigationBar title='Create requirements'>
        <ReactFileReader handleFiles={this.uploadCSV.bind(this)} fileTypes={'.csv'}>
          <Button className={styles.cancelButton}>Upload csv data</Button>
        </ReactFileReader>
        <Button className={styles.cancelButton}
                onClick={this.onCancel.bind(this)}>Cancel</Button>
        <Button className={styles.saveButton}
                onClick={this.onSave.bind(this)}>Save</Button>
      </NavigationBar>
      <Label className={styles.label} text='Quality standard name:'/>
      <TextField
        label="name"
        errors={this.state.errors.name}
        onChange={this.onNameChange.bind(this)}
        className={styles.qualityStandard} />
      <CreateRequirementsForm className={styles.form}>
        <Label text='Attributes:' className={styles.section}/>
        <div className={styles.list}>{ this.state.rows.map((row) => row) }</div>
      </CreateRequirementsForm>
      <Button onClick={this.addRow.bind(this)} className={styles.addRequirement}>Add requirement</Button>
    </div>);
  }
}

export default validation(strategy)(CreateRequirements);
