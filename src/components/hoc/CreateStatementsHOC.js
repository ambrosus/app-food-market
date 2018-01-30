import React from 'react';
import { connect } from 'react-redux';
import { addStatement, createStatement } from '../../redux/actions/StatementsAction';
import CreateStatements from '../stateless/specific/pages/CreateStatements/CreateStatements';

const mapStateToProps = (state) => ({
  tradeId: state.offer.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: async function (tradeId, statement) {
    const statementId = await addStatement(tradeId, 0);
    if (statementId) await dispatch(createStatement(tradeId, statement));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateStatements);
