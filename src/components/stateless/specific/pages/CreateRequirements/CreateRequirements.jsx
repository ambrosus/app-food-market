import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createRequirement} from '../../../../../redux/actions/MarketAction.js';
import CreateRequirementsLayout from './CreateRequirementsLayout';


const mapStateToProps = (state) => {
    return {
        address: state.market.address,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAdd: (name, requirements, address) => {
            dispatch(createRequirement(name, requirements, address, ownProps.history));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequirementsLayout);