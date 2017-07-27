import React, {Component} from "react";
import styles from "./TextField.scss";
import cx from "classnames";

export default class TextField extends Component {

    render() {
        return (<input className={cx(styles.input, this.props.className)}
                       placeholder={ this.props.placeholder }
                       ref={this.props.inputRef} type="text"/>)
    }
}