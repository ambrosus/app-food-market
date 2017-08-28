import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import Button from '../../../generic/Button/Button';
import styles from '../CreateRequirements/CreateRequirements.scss';
import utils from '../../../../../utils/utils';
import CreateMeasurementsRow from './CreateMeasurementsRow';

class CreateMeasurements extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      rows: [],
      form: {},
    };
  };

  static propTypes = {
    measurementsAddress: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    deviceList: PropTypes.array,
  };

  onCancel() {
    this.props.history.goBack();
  }

  onSave() {
    this.props.onSave(this.props.measurementsAddress, utils.mapToArray(this.state.form));
  }

  addRow() {
    let key = Date.now().toString();
    let element = (<CreateMeasurementsRow key={key}
                                          deviceList={this.props.deviceList}
                                          onRowChange={this.onRowChange.bind(this, key)}
                                          onRowRemove={this.onRowRemove.bind(this, key)} />);
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
      <NavigationBar title='Create requirements'>
        <Button className={styles.cancelButton}
                onClick={this.onCancel.bind(this)}>Cancel</Button>
        <Button className={styles.saveButton}
                onClick={this.onSave.bind(this)}>Save</Button>
      </NavigationBar>
      <div className={styles.list}>{ this.state.rows.map((row) => row) }</div>
      <Button onClick={this.addRow.bind(this)} className={styles.addRequirement}>Add measurement</Button>
    </div>);
  }
}

export default CreateMeasurements;
