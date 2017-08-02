import React, {Component} from "react";
import NavigationBar from "../../navigation/NavigationBar/NavigationBar";
import Button from "../../../generic/Button/Button";
import styles from './CreateRequirements.scss';
import TextField from "../../../generic/TextField/TextField";
import Label from "../../../generic/Label/Label";
import SelectorField from "../../../generic/SelectorField/SelectorField";

class CreateRequirements extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requirements: this.props.requirements
        }
    }

    static defaultProps = {
        requirements: []
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
        console.log('Saving');
    }

    render() {
        { console.log(this.state.requirements) }
        return (<div>
            <NavigationBar title="Create requirements">
                <Button className={styles.cancelButton}
                        onClick={this.onCancel.bind(this)}>Cancel</Button>
                <Button className={styles.saveButton}
                        onClick={this.onSave.bind(this)}>Save</Button>
            </NavigationBar>
            <Label className={styles.label} text="Quality standard name:"/>
            <TextField className={styles.qualityStandard}/>
            <Label text="Attributes:" className={styles.section}/>
            <div className={styles.list}>
                {this.state.requirements.map((element, index) => (<div key={index} className={styles.row}>
                    <TextField/>
                    <SelectorField options={[{value: 'Range'}, {value: 'Boolean'}]} className={styles.selector}/>
                    <TextField className={styles.selector}/>
                    <TextField className={styles.selector}/>
                    <TextField className={styles.selector}/>
                </div>))}
            </div>
            <Button onClick={this.addRow.bind(this)} className={styles.addRequirement}>Add requirement</Button>
        </div>)
    }
}

export default CreateRequirements;