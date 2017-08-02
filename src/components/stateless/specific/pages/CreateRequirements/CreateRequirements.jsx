import React, {Component} from "react";
import NavigationBar from "../../navigation/NavigationBar/NavigationBar";
import Button from "../../../generic/Button/Button";
import styles from './CreateRequirements.scss';
import TextField from "../../../generic/TextField/TextField";
import Label from "../../../generic/Label/Label";
import SelectorField from "../../../generic/SelectorField/SelectorField";

class CreateRequirements extends Component {

    render() {
        return (<div>
            <NavigationBar title="Create requirements">
                <Button className={styles.cancelButton}
                        onClick={this.props.history.goBack}>Cancel</Button>
                <Button className={styles.saveButton}
                        onClick={() => this.onSaveClick()}>Save</Button>
            </NavigationBar>
            <Label className={styles.label} text="Quality standard name:"/>
            <TextField className={styles.qualityStandard}/>
            <Label text="Attributes" className={styles.section}/>
            <div className={styles.list}>
                <div className={styles.row}>
                    <TextField />
                    <SelectorField options={[{value: 'Range'}]} className={styles.selector}/>
                    <TextField className={styles.selector}/>
                    <TextField className={styles.selector}/>
                    <TextField className={styles.selector}/>
                </div>
                <div className={styles.row}>
                    <TextField />
                    <SelectorField options={[{value: 'Range'}]} className={styles.selector}/>
                    <TextField className={styles.selector}/>
                    <TextField className={styles.selector}/>
                    <TextField className={styles.selector}/>
                </div>
            </div>
        </div>)
    }
}

export default CreateRequirements;