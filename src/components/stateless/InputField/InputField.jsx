import React, {Component} from "react";
import styles from './InputField.scss';

export default class InputField extends Component {
    render() {
        let {inputRef, ...rest} = this.props;
        return (<div className={styles.row}>
            <span className={styles.label}>{ this.props.label }</span>
            <input placeholder={ this.props.placeholder } type="text" className={styles.value} ref={this.props.inputRef}/>
        </div>)
    }
}