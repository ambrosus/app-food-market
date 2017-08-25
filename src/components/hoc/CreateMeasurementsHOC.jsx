import React from 'react';
import { connect } from 'react-redux';
import { createRequirement } from '../../redux/actions/RequirementAction.js';
import CreateMeasurements from '../stateless/specific/pages/CreateMeasurements/CreateMeasurements';
import { addMeasurements } from '../../redux/actions/MeasurementsAction';

const mapStateToProps = (state) => ({
  measurementsAddress: state.offer.measurementsAddress,
  deviceList: state.market.devices,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: (measurementAddress, measurements) => {
    dispatch(addMeasurements(measurementAddress, measurements, ownProps.history));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateMeasurements);
