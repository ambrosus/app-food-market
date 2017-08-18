import React, { Component } from 'react';
import { connect } from 'react-redux';
import BalanceTooLowModal from '../stateless/specific/modals/BalanceTooLowModal/BalanceTooLowModal';

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => ({
    onConfirm: () => console.log('Not yet implemented!'),
    onCancel: () => dispatch(modelHide()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(BalanceTooLowModal);
