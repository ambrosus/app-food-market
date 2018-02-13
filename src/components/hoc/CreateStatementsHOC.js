import React from 'react';
import { connect } from 'react-redux';
import api from '../../api';
import { getStatementId, createStatement } from '../../redux/actions/StatementsAction';
import { showModal, hideModal } from '../../redux/actions/ModalAction';
import CreateStatements from '../stateless/specific/pages/CreateStatements/CreateStatements';

const mapStateToProps = (state) => ({
  tradeId: state.offer.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: async (tradeId, statement) => {
    const { type, value, fileData } = statement;
    const isFile = type === 'file';
    const statementId = await getStatementId(tradeId, isFile);
    if (!statementId) return;
    if (isFile) await api.files.uploadFile(statementId, fileData, 'statement');
    await dispatch(createStatement(tradeId, value, statementId));
  },

  showModal: (type, title) => dispatch(showModal(type, { title })),

  hideModal: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateStatements);
