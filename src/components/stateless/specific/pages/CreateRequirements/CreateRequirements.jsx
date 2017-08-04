import React, {Component} from "react";
import NavigationBar from "../../navigation/NavigationBar/NavigationBar";
import {connect} from 'react-redux';
import Button from "../../../generic/Button/Button";
import styles from './CreateRequirements.scss';
import TextField from "../../../generic/TextField/TextField";
import Label from "../../../generic/Label/Label";
import SelectorField from "../../../generic/SelectorField/SelectorField";
import {createRequirement} from '../../../../../redux/actions/MarketAction.js';
import validation from 'react-validation-mixin';
import strategy from 'react-validatorjs-strategy';
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