import React, {Component} from "react";
import styles from "./TextField.scss";

export default class TextField extends Component {
    
    render() {
        let {inputRef, ...otherProps} = this.props;
        return (<div {...otherProps}>
            <span className={styles.label}>{ this.props.label }</span>
            <input className={styles.input} placeholder={ this.props.placeholder } type="text" ref={this.props.inputRef}/>
        </div>)
    }
}