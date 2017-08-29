import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import Button from '../../../generic/Button/Button';
import styles from '../CreateRequirements/CreateRequirements.scss';
import utils from '../../../../../utils/utils';
import CreateMeasurementsRow from './CreateMeasurementsRow';
import ReactFileReader from 'react-file-reader';
import _ from 'lodash';

class CreateMeasurements extends Component {

  static propTypes = {
    measurementsAddress: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    uploadCSV: PropTypes.func,
    deviceList: PropTypes.array,
    measurementsForm: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      form: {},
    };
  };

  componentDidMount() {
    if (this.props.measurementsForm) {
      this.fillMeasurementsForm(this.props.measurementsForm);
      this.props.reset();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.measurementsForm) {
      this.fillMeasurementsForm(nextProps.measurementsForm);
      this.props.reset();
    }
  }

  onCancel() {
    this.props.history.goBack();
  }

  onSave() {
    this.props.onSave(this.props.measurementsAddress, utils.mapToArray(this.state.form));
  }

  uploadCSV(files) {
    this.props.uploadCSV(files[0]);
  };

  fillMeasurementsForm(defaultForm) {
    let rows = [];
    let form = {};
    for (let formRow of defaultForm) {
      let key = _.uniqueId();
      let element = (<CreateMeasurementsRow key={key}
                                            {...formRow}
                                            deviceList={this.props.deviceList}
                                            onRowChange={this.onRowChange.bind(this, key)}
                                            onRowRemove={this.onRowRemove.bind(this, key)}/>);
      form[key] = formRow;
      rows = [...rows, element];
    }

    this.setState({ rows, form });
  }

  addRow() {
    let key = _.uniqueId();
    let element = (<CreateMeasurementsRow key={key}
                                          deviceList={this.props.deviceList}
                                          onRowChange={this.onRowChange.bind(this, key)}
                                          onRowRemove={this.onRowRemove.bind(this, key)}/>);
    let formClone = Object.assign({}, this.state.form);
    formClone[key] = {};
    this.setState({
      rows: [...this.state.rows, element],
      form: formClone,
    });
  }

  onRowChange(key, state) {
    this.setState({
      form: Object.assign(this.state.form, { [key]: state }),
    });
  }

  onRowRemove(key) {
    const filtered = this.state.rows.filter((row) => row.key !== key);
    let formClone = Object.assign({}, this.state.form);
    delete formClone[key];
    this.setState({
      rows: [...filtered],
      form: formClone,
    });
  }

  render() {
    return (<div>
      <NavigationBar title='Create measurements'>
        <ReactFileReader handleFiles={this.uploadCSV.bind(this)} fileTypes={'.csv'}>
          <Button className={styles.cancelButton}>Upload csv data</Button>
        </ReactFileReader>
        <Button className={styles.cancelButton}
                onClick={this.onCancel.bind(this)}>Cancel</Button>
        <Button className={styles.saveButton}
                onClick={this.onSave.bind(this)}>Save</Button>

      </NavigationBar>
      <div className={styles.list}>{this.state.rows.map((row) => row)}</div>
      <Button onClick={this.addRow.bind(this)} className={styles.addRequirement}>Add measurement</Button>
    </div>);
  }
}

export default CreateMeasurements;
