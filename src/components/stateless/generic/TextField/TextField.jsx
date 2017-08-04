import React, {Component} from "react";
import styles from "./TextField.scss";
import cx from "classnames";

export default class TextField extends Component {

    render() {
        return (<div>
            <input className={cx(styles.input, this.props.error&&this.props.error[0]?styles.error:'', this.props.className)}
                   placeholder={this.props.placeholder}
                   ref={this.props.inputRef}
                   type="text"
                   onChange={this.props.validate}/>
            <p className={cx(styles.message)}>{this.props.error}</p>
        </div>);
    }
}