import React, {Component} from "react";
import cx from "classnames";
import styles from "./ConfirmBuyModal.scss";
import Label from "../Label/Label";
import Button from "../Button/Button";

export default class ConfirmBuyModal extends Component {
    render() {
        return (<div className={cx(styles.modal, this.props.className)}>
            <div className={styles.inner}>
                <div className={styles.upper}>
                    <Label className={styles.title} text="Confirm buy"/>
                    <span>We put 140 EUR tokens into ESCROW</span>
                </div>
                <div className={styles.lower}>
                    <div><input id="checkBox" type="checkbox"/> I want to insure my delivery for 2% of value of delivery
                    </div>
                    <div className={styles.buttons}><Button className={styles.cancel}>Cancel</Button>
                        <Button className={styles.confirm}>Confirm my order</Button>
                    </div>
                </div>
            </div>
        </div>)
    }
}