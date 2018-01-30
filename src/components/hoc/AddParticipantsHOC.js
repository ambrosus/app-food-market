import React from 'react';
import { connect } from 'react-redux';
import { addParticipant } from '../../redux/actions/StatementsAction';
import AddParticipants from '../stateless/specific/pages/AddParticipants/AddParticipants';

const mapStateToProps = (state) => ({
  tradeId: state.offer.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: async function (tradeId, participantAddress) {
    await addParticipant(tradeId, participantAddress);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddParticipants);
