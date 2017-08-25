import React from 'react';
import { connect } from 'react-redux';
import { createRequirement } from '../../redux/actions/RequirementAction.js';
import CreateRequirements from '../stateless/specific/pages/CreateRequirements/CreateRequirements';

const mapStateToProps = (state) => ({
    address: state.market.address,
  });

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSave: (name, requirements, address) => {
      dispatch(createRequirement(name, requirements, address, ownProps.history));
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequirements);
