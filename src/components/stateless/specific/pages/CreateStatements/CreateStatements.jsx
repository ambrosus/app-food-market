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
      statementData: {id: 1, type: 'text', value: ''}
    };
  };

  onCancel = () => this.props.history.goBack();

  onSave = async () => {
    const { statementData } = this.state;
    if (!statementData.value) return;
    this.props.onSave(this.props.tradeId, statementData, this.props.history)
  };

  onChangeStatement = data => {
    this.setState({statementData: { ...this.state.statementData, ...data} });
  };

  onRemoveStatement = () => {
    this.setState({statementData: null});
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
    const statement = {id: 1, type: 'file', fileData: dataUrl, size: formatSize, value: name};
    this.setState({ statementData: statement });
    this.props.hideModal();
  };

  onFileUpload = e => {
    const { showModal } = this.props;
    showModal('TransactionProgressModal', 'File uploading');
    this.file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = this.loadHandler;
    reader.onerror = err => showModal('ErrorModal', err);
    e.target.value = null;
  };

  renderStatement = () => {
    const { statementData } = this.state;
    if (!statementData) return null;
    return <StatementRow key={statementData.id}
                         {...statementData}
                         onRowChange={this.onChangeStatement}
                         onRowRemove={this.onRemoveStatement}/>
  };

  render() {
    return (<div>
      <NavigationBar title='Create statements'>
        <div className={styles.uploadFileWrapper}>
          <span>Upload file</span>
          <input className={styles.uploadFile} type='file' onChange={this.onFileUpload}/>
        </div>
        <Button className={styles.cancelButton}
                onClick={this.onCancel}>Cancel</Button>
        <Button className={styles.saveButton}
                onClick={this.onSave}>Save</Button>
      </NavigationBar>
      <div className={styles.list}>{this.renderStatement()}</div>
    </div>);
  }
}
