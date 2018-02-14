import React from 'react';
import { connect } from 'react-redux';
import api from '../../api';
import { addStatement } from '../../redux/actions/StatementsAction';
import { showModal, hideModal } from '../../redux/actions/ModalAction';
import CreateStatements from '../stateless/specific/pages/CreateStatements/CreateStatements';

const mapStateToProps = (state) => ({
  tradeId: state.offer.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: (tradeId, statement, history) => {
    const { type, value, fileData } = statement;
    const isFile = type === 'file';
    dispatch(addStatement(tradeId, isFile, value, fileData, history));
  },

  showModal: (type, title) => dispatch(showModal(type, { title })),

  hideModal: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateStatements);
