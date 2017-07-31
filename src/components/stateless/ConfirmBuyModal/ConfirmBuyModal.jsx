import React, {Component} from "react";
import cx from "classnames";
import styles from "./ConfirmBuyModal.scss";
import Label from "../Label/Label";
import Button from "../Button/Button";
import AttributeValueFieldContainer from "../AttributeValueFieldContainer/AttributeValueFieldContainer";

export default class ConfirmBuyModal extends Component {
    render() {
        return (<div className={cx(styles.modal, this.props.className)}>
            <div className={styles.inner}>
                <div className={styles.upper}>
                    <Label className={styles.title} text="Confirm buy"/>
                    <div className={styles.description}>We put 140 EUR tokens into ESCROW</div>
                    <div className={styles.table}>
                        <AttributeValueFieldContainer
                            options={[
                                {field: 'Price', value: '35 euro / kg'},
                                {field: 'Price per package', value: '140 euro'},
                                {field: 'Per package', value: '4 kg'},
                                ]}/>
                        <AttributeValueFieldContainer
                            options={[
                                {field: 'TOTAL WEIGHT', value: '4 kg'},
                                {field: 'TOTAL PRICE', value: '140 euro'},
                        ]}/>
                    </div>
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