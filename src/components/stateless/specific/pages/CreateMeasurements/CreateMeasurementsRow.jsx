import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectorField from '../../../generic/SelectorField/SelectorField';
import styles from './CreateMeasurementsRow.scss';
import TextField from '../../../generic/TextField/TextField';

class CreateMeasurementsRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      value: this.props.value,
      event: this.props.event,
      farmerId: this.props.farmerId,
      batchId: this.props.batchId,
      device: this.props.device,
    };
  }

  static propTypes = {
    deviceList: PropTypes.array,
    onRowRemove: PropTypes.func,
    onRowChange: PropTypes.func,
  };

  static defaultProps = {
    deviceList: [],
  };

  render() {

    const events = [
      { value: 'Inspection' },
      { value: 'Loading' },
      { value: 'Transport' },
      { value: 'Unloading' },
      { value: 'Arrival' },
    ];

    return (<div className={styles.row}>
      <TextField label="id"
                 placeholder='ID'
                 value={this.state.id}
                 onChange={this.onFieldChange.bind(this)}/>
      <TextField label="value"
                 className={styles.selector}
                 value={this.state.value}
                 onChange={this.onFieldChange.bind(this)}
                 placeholder='Value'/>
      <SelectorField label="event"
                     className={styles.selector}
                     value={this.state.event}
                     onChange={this.onFieldChange.bind(this)}
                     placeholder='Event'
                     options={events}/>
      <TextField label="farmerId"
                 className={styles.selector}
                 value={this.state.farmerId}
                 onChange={this.onFieldChange.bind(this)}
                 placeholder='Farmer'/>
      <TextField label="batchId"
                 className={styles.selector}
                 value={this.state.batchId}
                 onChange={this.onFieldChange.bind(this)}
                 placeholder='Batch'/>
      <SelectorField className={styles.selector}
                     placeholder="Device"
                     label="device"
                     value={this.state.device}
                     onChange={this.onFieldChange.bind(this)}
                     options={this.props.deviceList.map((dev) => ({ value: dev }))}/>
      <img className={styles.removeIcon} onClick={this.props.onRowRemove}
           src="./static/images/transaction-rejected.svg"/>
    </div>);
  }

  onFieldChange(label, inputState) {
    let state = { ...this.state, [label]: inputState.value };
    this.setState(state, this.props.onRowChange.bind(this, state));
  }
}

export default CreateMeasurementsRow;
