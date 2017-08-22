import React from 'react';
import { connect } from 'react-redux';
import ModalContainer from '../stateless/specific/containers/ModalContainer/ModalContainer';

const mapStateToProps = (state) => ({
  name: state.modal.name,
  args: state.modal.args,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
