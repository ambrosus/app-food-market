import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import Button from '../../../generic/Button/Button';
import styles from './CreateStatements.scss';
import CreateStatementRow from './CreateStatementRow';
import _ from 'lodash';

export default class CreateStatement extends Component {

  static propTypes = {
    onSave: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      statements: [{ id: _.uniqueId(), value: '' }]
    };
  };

  onCancel = () => {
    this.props.history.goBack();
  };

  onSave = () => {
    this.state.statements
      .filter(statement => !!statement.value)
      .map(statement => this.props.onSave(this.props.tradeId, statement.value));
    this.props.history.goBack();
  };

  addStatement = () => {
    const statement = {id: _.uniqueId(), value: ''};
    this.setState({statements: [ ...this.state.statements, statement ]});
  };

  onChangeStatement = (id, statementData) => {
    const statements = this.state.statements.map(statement => statement.id === id
      ? {...statement, ...statementData}
      : statement);
    this.setState({statements});
  };

  onRemoveStatement = id => {
    const statements = this.state.statements.filter(statement => statement.id !== id);
    this.setState({statements});
  };

  renderStatement = statement => {
    return <CreateStatementRow key={statement.id}
                               {...statement}
                               deviceList={this.props.deviceList}
                               onRowChange={this.onChangeStatement}
                               onRowRemove={this.onRemoveStatement}/>
  };

  render() {
    return (<div>
      <NavigationBar title='Create statements'>
        <Button className={styles.cancelButton}
                onClick={this.onCancel}>Cancel</Button>
        <Button className={styles.saveButton}
                onClick={this.onSave}>Save</Button>
      </NavigationBar>
      <div className={styles.list}>{this.state.statements.map(statement => this.renderStatement(statement))}</div>
      <Button onClick={this.addStatement} className={styles.addStatement}>Add statement</Button>
    </div>);
  }
}
