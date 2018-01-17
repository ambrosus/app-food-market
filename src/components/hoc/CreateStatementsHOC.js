import React from 'react';
import { connect } from 'react-redux';
import { createStatement } from '../../redux/actions/StatementsAction.js';
import CreateStatements from '../stateless/specific/pages/CreateStatements/CreateStatements';
import {
  addMeasurements, resetMeasurementForm,
  fillMeasurementForm,
} from '../../redux/actions/MeasurementsAction';

const mapStateToProps = (state) => ({
  address: state.market.address,
  tradeId: state.offer.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: (tradeId, statement) => {
    dispatch(createStatement(tradeId, statement));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateStatements);
