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
        this.state = {
            requirements: this.props.requirements,
        }
        this.name = '';
    }

    getRequirementsData() {
        return this.state.requirements.map((r) => ({
            id: r.id.value,
            type: 0,
            decimals: parseInt(r.decimals.value) || 0,
            min: parseInt(r.min.value) || 0,
            max: parseInt(r.max.value) || 0
        }));
    }

    static defaultProps = {
        requirements: [],
    };

    addRow() {
        let clone = this.state.requirements.slice();
        clone.push({});
        this.setState({
            requirements: clone
        })
    }

    onCancel() {
        this.props.history.goBack();
    }

    onSave() {
        this.props.onAdd(this.name.value, this.getRequirementsData(), this.props.address);
    }

    render() {
        return (<div>
            <NavigationBar title="Create requirements">
                <Button className={styles.cancelButton}
                        onClick={this.onCancel.bind(this)}>Cancel</Button>
                <Button className={styles.saveButton}
                        onClick={this.onSave.bind(this)}>Save</Button>
            </NavigationBar>
            <Label className={styles.label} text="Quality standard name:"/>
            <TextField className={styles.qualityStandard} inputRef={el => this.name = el}/>
            <Label text="Attributes:" className={styles.section}/>
            <div className={styles.list}>
                {this.state.requirements.map((element, index) => (<div key={index} className={styles.row}>
                    <TextField inputRef={el => element.id = el}/>
                    <SelectorField options={[{value: 'Range'}, {value: 'Boolean'}]} className={styles.selector}/>
                    <TextField className={styles.selector} inputRef={el => element.decimals = el}/>
                    <TextField className={styles.selector} inputRef={el => element.min = el}/>
                    <TextField className={styles.selector} inputRef={el => element.max = el}/>
                </div>))}
            </div>
            <Button onClick={this.addRow.bind(this)} className={styles.addRequirement}>Add requirement</Button>
        </div>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequirements);