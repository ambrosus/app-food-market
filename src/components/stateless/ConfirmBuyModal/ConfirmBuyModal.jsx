import React, {Component} from "react";
import cx from "classnames";
import styles from "./ConfirmBuyModal.scss";

export default class ConfirmBuyModal extends Component {
    render() {
        return (<div className={cx(styles.modal, this.props.className)}>
            <div className={styles.inner}>Hello World</div>
        </div>)
    }
}