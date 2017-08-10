import React, {Component} from 'react';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import {connect} from 'react-redux';
import Button from '../../../generic/Button/Button';
import styles from './CreateRequirements.scss';
import TextField from '../../../generic/TextField/TextField';
import Label from '../../../generic/Label/Label';
import SelectorField from '../../../generic/SelectorField/SelectorField';
import {createRequirement} from '../../../../../redux/actions/MarketAction.js';
import validation from 'react-validation-mixin';
import strategy from 'react-validatorjs-strategy'; 

const RANGE_REQUIREMENT = 0;

class CreateRequirementsLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requirements: this.props.requirements,
            rowCount: this.props.rowCount,
            validatorMessages: {
                'required': 'This field is required',
                'numeric': 'This is not a number',
            }
        };
        this.name = '';
        this.validatorRules = {name: 'required'};
        this.validatorTypes = strategy.createSchema(this.validatorRules, this.state.validatorMessages);
        this.getValidatorData = this.getValidatorData.bind(this);
    }

    getValidatorData() {
        var validatorData = {name: this.name.value};
        let count = this.state.rowCount;
        for (let i=0; i<count; i++) {
            validatorData[`id${i}`] = this.state.requirements[i].id.value;
            validatorData[`decimals${i}`] = this.state.requirements[i].decimals.value;
            validatorData[`min${i}`] = this.state.requirements[i].min.value;
            validatorData[`max${i}`] = this.state.requirements[i].max.value;
        }
        return validatorData;
    }

    getRequirementsData() {
        return this.state.requirements.map((r) => ({
            id: r.id.value,
            type: RANGE_REQUIREMENT,
            decimals: parseInt(r.decimals.value) || 0,
            min: parseInt(r.min.value) || 0,
            max: parseInt(r.max.value) || 0
        }));
    }

    static defaultProps = {
        requirements: [],
        rowCount: 0,
    };

    addRow() {
        let clone = this.state.requirements.slice();
        let count = this.state.rowCount;
        clone.push({});
        this.validatorRules = {...this.validatorRules,
                [`id${count}`]: 'required',
                [`decimals${count}`]: 'required|numeric',
                [`min${count}`]: 'required|numeric',
                [`max${count}`]: 'required|numeric',
            };
        this.validatorTypes = strategy.createSchema(this.validatorRules, this.state.validatorMessages);
        this.setState({
            requirements: clone,
            rowCount: count+1,          
        });
    }

    onCancel() {
        this.props.history.goBack();
    }

    onSave() {
        this.props.validate((err) => {
            if (err)
                return;
            this.props.onAdd(this.name.value, this.getRequirementsData(), this.props.address);
        });
    }
        

    render() {
        return (<div>
            <NavigationBar title='Create requirements'>
                <Button className={styles.cancelButton}
                        onClick={this.onCancel.bind(this)}>Cancel</Button>
                <Button className={styles.saveButton}
                        onClick={this.onSave.bind(this)}>Save</Button>
            </NavigationBar>
            <Label className={styles.label} text='Quality standard name:'/>
            <TextField className={styles.qualityStandard} 
                       inputRef={el => this.name = el}
                       validate={this.props.handleValidation('name')}
                       error={this.props.getValidationMessages('name')}/>
            <Label text='Attributes:' className={styles.section}/>
            <div className={styles.list}>
                {this.state.requirements.map((element, index) => (<div key={index} className={styles.row}>
                    <TextField placeholder='ID' 
                               inputRef={el => element.id = el} 
                               validate={this.props.handleValidation(`id${index}`)}
                               error={this.props.getValidationMessages(`id${index}`)}/>
                    <SelectorField options={[{value: 'Range'}, {value: 'Boolean'}]} className={styles.selector}/>
                    <TextField className={styles.selector} 
                               placeholder='Decimals' 
                               inputRef={el => element.decimals = el}
                               validate={this.props.handleValidation(`decimals${index}`)}
                               error={this.props.getValidationMessages(`decimals${index}`)}/>
                    <TextField className={styles.selector} 
                               placeholder='Min' 
                               inputRef={el => element.min = el}
                               validate={this.props.handleValidation(`min${index}`)}
                               error={this.props.getValidationMessages(`min${index}`)}/>
                    <TextField className={styles.selector} 
                               placeholder='Max' 
                               inputRef={el => element.max = el}
                               validate={this.props.handleValidation(`max${index}`)}
                               error={this.props.getValidationMessages(`max${index}`)}/>
                </div>))}
            </div>
            <Button onClick={this.addRow.bind(this)} className={styles.addRequirement}>Add requirement</Button>
        </div>)
    }
}

export default validation(strategy)(CreateRequirementsLayout);