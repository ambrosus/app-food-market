import React from 'react';
import { connect } from 'react-redux';
import Papa from 'papaparse';
import CreateRequirements from '../stateless/specific/pages/CreateRequirements/CreateRequirements';
import { createRequirement, fillRequirementForm, resetRequirementForm } from '../../redux/actions/RequirementAction';

const mapStateToProps = (state) => ({
  address: state.market.address,
  requirementsForm: state.market.requirementsForm,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: (name, requirements, address) => {
    dispatch(createRequirement(name, requirements, address, ownProps.history));
  },

  uploadCSV: (file) => {
    Papa.parse(file, {
      skipEmptyLines: true,
      complete: (res) => {
        let form = res.data.map((row) => ({
          id: row[0],
          decimals: row[1],
          type: row[2],
          min: row[3],
          max: row[4],
        }));
        dispatch(fillRequirementForm(form));
      },
    });
  },

  reset: () => {
    dispatch(resetRequirementForm());
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequirements);
