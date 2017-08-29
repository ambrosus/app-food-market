import React from 'react';
import { connect } from 'react-redux';
import Papa from 'papaparse';
import CreateMeasurements from '../stateless/specific/pages/CreateMeasurements/CreateMeasurements';
import {
  addMeasurements, resetDefaultMeasurementsForm,
  setDefaultMeasurementsForm,
} from '../../redux/actions/MeasurementsAction';

const mapStateToProps = (state) => ({
  measurementsAddress: state.offer.measurementsAddress,
  deviceList: state.market.devices,
  defaultForm: state.market.defaultMeasurements,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: (measurementAddress, measurements) => {
    dispatch(addMeasurements(measurementAddress, measurements, ownProps.history));
  },

  uploadCSV: (file) => {
    Papa.parse(file, {
      skipEmptyLines: true,
      complete: (res) => {
        let form = res.data.map((row) => ({
          id: row[0],
          value: row[1],
          event: row[2],
          farmerId: row[3],
          batchId: row[4],
          device: row[5],
        }));
        dispatch(setDefaultMeasurementsForm(form));
      },
    });
  },

  reset: () => {
    dispatch(resetDefaultMeasurementsForm());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateMeasurements);
