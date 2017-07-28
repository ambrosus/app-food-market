import React, {Component} from "react";
import cx from "classnames";
import styles from "./ConfirmBuyModal.scss";

export default class ConfirmBuyModal extends Component {

    render() {
        return (<div {...this.props} className={cx(styles.modal, this.props.className)}>{this.props.children}</div>)
    }
}