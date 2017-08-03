import React, {Component} from "react";
import NavigationBar from "../../navigation/NavigationBar/NavigationBar";
import {connect} from 'react-redux';
import Button from "../../../generic/Button/Button";
import styles from './CreateRequirements.scss';
import TextField from "../../../generic/TextField/TextField";
import Label from "../../../generic/Label/Label";
import SelectorField from "../../../generic/SelectorField/SelectorField";
import {createRequirement} from '../../../../../redux/actions/MarketAction.js';

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


class CreateRequirements extends Component {

    constructor(props) {
        super(props);
        this.requirements = [{},{}];
        this.name = '';
    }

    getRequirementsData() {
        return this.requirements.map((r) => ({
            id: r.id.value,
            type: 0,
            decimals: parseInt(r.decimals.value),
            min: parseInt(r.min.value),
            max: parseInt(r.max.value)
        }));
    }

    render() {
        return (<div>
            <NavigationBar title="Create requirements">
                <Button className={styles.cancelButton}
                        onClick={this.props.history.goBack}>Cancel</Button>
                <Button className={styles.saveButton}
                        onClick={() => this.props.onAdd(this.name.value, this.getRequirementsData(), this.props.address)}>
                    Save
                </Button>
            </NavigationBar>
            <Label className={styles.label} text="Quality standard name:"/>
            <TextField className={styles.qualityStandard} inputRef={el => this.name = el}/>
            <Label text="Attributes:" className={styles.section}/>
            <div className={styles.list}>
                <div className={styles.row}>
                    <TextField inputRef={el => this.requirements[0].id = el}/>
                    <SelectorField options={[{value: 'Range'}, {value: 'Boolean'}]} className={styles.selector}/>
                    <TextField className={styles.selector} inputRef={el => this.requirements[0].decimals = el}/>
                    <TextField className={styles.selector} inputRef={el => this.requirements[0].min = el}/>
                    <TextField className={styles.selector} inputRef={el => this.requirements[0].max = el}/>
                </div>
                <div className={styles.row}>
                    <TextField inputRef={el => this.requirements[1].id = el}/>
                    <SelectorField options={[{value: 'Range'}, {value: 'Boolean'}]} className={styles.selector}/>
                    <TextField className={styles.selector} inputRef={el => this.requirements[1].decimals = el}/>
                    <TextField className={styles.selector} inputRef={el => this.requirements[1].min = el}/>
                    <TextField className={styles.selector} inputRef={el => this.requirements[1].max = el}/>
                </div>
            </div>
        </div>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequirements);