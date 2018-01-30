import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import Button from '../../../generic/Button/Button';
import styles from './AddParticipants.scss';
import AddParticipantRow from './AddParticipantRow';
import uniqueId from 'lodash/uniqueId';

export default class AddParticipants extends Component {

  static propTypes = {
    tradeId: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      participants: [{ id: uniqueId(), value: '' }]
    };
  };

  onCancel = () => this.props.history.goBack();

  onSave = async () => {
    const participants = this.state.participants
      .filter(participant => !!participant.value)
      .map(participant => participant.value);
    const list = [ ...new Set(participants)];
    await Promise.all(list.map(participant => this.props.onSave(this.props.tradeId, participant)));
    this.props.history.goBack();
  };

  addParticipant = () => {
    const participant = {id: uniqueId(), value: ''};
    this.setState({participants: [ ...this.state.participants, participant ]});
  };

  onChangeParticipant = (id, participantsData) => {
    const participants = this.state.participants.map(participant => participant.id === id
      ? {...participant, ...participantsData}
      : participant);
    this.setState({participants});
  };

  onRemoveParticipant = id => {
    const participants = this.state.participants.filter(participant => participant.id !== id);
    this.setState({participants});
  };

  renderParticipant = participant => {
    return <AddParticipantRow key={participant.id}
                               {...participant}
                               deviceList={this.props.deviceList}
                               onRowChange={this.onChangeParticipant}
                               onRowRemove={this.onRemoveParticipant}/>
  };

  render() {
    return (<div>
      <NavigationBar title='Add participants'>
        <Button className={styles.cancelButton}
                onClick={this.onCancel}>Cancel</Button>
        <Button className={styles.saveButton}
                onClick={this.onSave}>Save</Button>
      </NavigationBar>
      <div className={styles.list}>{this.state.participants.map(participant => this.renderParticipant(participant))}</div>
      <Button onClick={this.addParticipant} className={styles.addParticipant}>Add participant</Button>
    </div>);
  }
}
