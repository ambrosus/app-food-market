import React, {Component} from "react";
import cx from "classnames";
import styles from "./Button.scss";

export default class Button extends Component {

    render() {
        return (<div {...this.props} className={cx(styles.button, this.props.className)}>{this.props.children}</div>)
    }
}