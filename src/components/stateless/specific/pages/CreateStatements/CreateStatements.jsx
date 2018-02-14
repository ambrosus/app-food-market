import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import Button from '../../../generic/Button/Button';
import styles from './CreateStatements.scss';
import StatementRow from './StatementRow';
import uniqueId from 'lodash/uniqueId';

export default class CreateStatement extends Component {

  static propTypes = {
    onSave: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    tradeId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      statements: [ ]
    };
  };

  onCancel = () => this.props.history.goBack();

  onSave = async () => {
    await Promise.all(this.state.statements
      .filter(statement => !!statement.value)
      .map(statement => this.props.onSave(this.props.tradeId, statement)));
    this.props.history.push('product-info');
  };

  addStatement = () => {
    const statement = {id: uniqueId(), type: 'text', value: ''};
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

  getFormatBytes = (bytes, decimals) => {
    if (+bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  loadHandler = e => {
    const dataUrl = e.target.result;
    const { name, size } = this.file;
    const formatSize = this.getFormatBytes(size);
    const statement = {id: uniqueId(), type: 'file', fileData: dataUrl, size: formatSize, value: name};
    this.setState({ statements: [ ...this.state.statements, statement ] });
    this.props.hideModal();
  };

  onFileUpload = e => {
    const { showModal } = this.props;
    showModal('TransactionProgressModal', 'File uploading');
    this.file = e.target.files[0];
    const { size, type } = this.file;
    const allowedExtensions = ['png', 'jpeg', 'csv', 'pdf', 'docs'];
    const isAllowedSize = size / 1024 < 10000;
    const isAllowedExtension = allowedExtensions.some(extension => new RegExp(`${extension}$`).test(type));
    const reader = new FileReader();
    if (!isAllowedSize || !isAllowedExtension) {
      const errorText = !isAllowedSize ? 'File size should be less than 10Mb' : 'You couldn\'t upload this file type';
      showModal('ErrorModal', errorText);
      return;
    }
    reader.readAsDataURL(this.file);
    reader.onload = this.loadHandler;
    reader.onerror = err => showModal('ErrorModal', err);
    e.target.value = null;
  };

  renderStatement = statement => {
    return <StatementRow key={statement.id}
                         {...statement}
                         onRowChange={this.onChangeStatement}
                         onRowRemove={this.onRemoveStatement}/>
  };

  render() {
    return (<div>
      <NavigationBar title='Create statements'>
        <div className={styles.uploadFileWrapper}>
          <span>Upload file</span>
          <input className={styles.uploadFile}
                 type='file' onChange={this.onFileUpload}
                 accept='image/jpeg,image/png,application/pdf,application/msword,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel' />
        </div>
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
