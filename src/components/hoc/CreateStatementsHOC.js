import React from 'react';
import { connect } from 'react-redux';
import { addStatement, createStatement } from '../../redux/actions/StatementsAction';
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
  onSave: async function (tradeId, statement) {
    const statementId = await addStatement(tradeId, 0);
    if (statementId) await dispatch(createStatement(tradeId, statement));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateStatements);
