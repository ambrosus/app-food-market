import React, {Component} from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./ConfirmBuyModal.scss";
import Label from "../../../generic/Label/Label";
import Button from "../../../generic/Button/Button";
import AttributeValueFieldContainer from "../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer";
import {showModal, hideModal} from '../../../../../redux/actions/ModalAction';
import  { escrow } from "../../../../../redux/actions/PurchaseAction";


const mapStateToProps = (state) => {
    return {
        offer: state.offer,
        quantity: state.modal.args.quantity,
        token: state.token.token?state.token.token.contract:null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onConfirm: (offer, quantity, token) => {
            if (token)
                dispatch(escrow(offer, quantity, token));
            else{
                dispatch(showModal("ErrorModal", {reason: "No token specified"}))
            }
        },
        onCancel: () => dispatch(hideModal())
    }
};

class ConfirmBuyModal extends Component {

    static defaultProps = {
        visible: false,
        quantity: 1,
        onCancel: () => {
            console.info('onCancel not defined in ', ConfirmBuyModal)
        },
        onConfirm: () => {
            console.info('onConfirm not defined in ', ConfirmBuyModal)
        }
    };

    static propTypes = {
        onCancel: PropTypes.func,
        onConfirm: PropTypes.func,
    };

    buy() {
        this.props.onConfirm(this.props.offer, this.props.quantity, this.props.token);
    }

    render() {
        console.log(this.props.offer)
        let total = (this.props.quantity * this.props.offer.pricePerPackage / 100).toFixed(2);
        let weight = this.props.quantity * this.props.offer.packageWeight / 100;
        return (<div>
            <div className={cx(styles.modal, this.props.className)}>
                <div className={styles.inner}>
                    <div className={styles.upper}>
                        <Label className={styles.title} text="Confirm buy"/>
                        <div className={styles.description}>We put {total} EUR tokens into ESCROW</div>
                        <div className={styles.table}>
                            <AttributeValueFieldContainer
                                options={[
                                    {field: 'Price', value: `${(this.props.offer.pricePerUnit/100).toFixed(2)} euro / kg`},
                                    {
                                        field: 'Price per package', 
                                        value: `${(this.props.offer.pricePerPackage/100).toFixed(2)} euro`
                                    },
                                    {field: 'Per package', value: `${this.props.offer.packageWeight/100} kg`},
                                ]}/>
                            <AttributeValueFieldContainer
                                options={[
                                    {field: 'TOTAL WEIGHT', value: `${weight} kg`},
                                    {field: 'TOTAL PRICE', value: `${total} euro`},
                                ]}/>
                        </div>
                    </div>
                    <div className={styles.lower}>
                        <div><input id="checkBox" type="checkbox"/> I want to insure my delivery for 2% of value of
                            delivery
                        </div>
                        <div className={styles.buttons}>
                            <Button onClick={this.props.onCancel} className={styles.cancel}>Cancel</Button>
                            <Button onClick={()=>this.buy()} className={styles.confirm}>Confirm my order</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmBuyModal);
