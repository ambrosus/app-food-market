import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./BalanceTooLowModal.scss";
import Label from "../../generic/Label/Label";
import {cancel, confirm} from '../../../../redux/actions/ModalActions';
import {Link} from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        visible: state.modal.visible,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onConfirm: () => dispatch(confirm()),
        onCancel: () => dispatch(cancel())
    }
};

class BalanceTooLowModal extends Component {

    static defaultProps = {
        visible: false,
        onCancel: () => {
            console.info('onCancel not defined in ', BalanceTooLowModal)
        },
        onConfirm: () => {
            console.info('onConfirm not defined in ', BalanceTooLowModal)
        }
    };

    static propTypes = {
        visible: PropTypes.bool,
        onCancel: PropTypes.func,
        onConfirm: PropTypes.func,
    };

    render() {
        return <div>
            {this.props.visible && (
                <div onClick={this.props.onCancel} className={cx(styles.modal, this.props.className)}>
                    <div className={styles.inner}>
                        <img src="./static/images/iconError.svg" className={styles.icon}/>
                        <Label className={styles.title} text="Balance is too low"/>
                        <p className={styles.description}>You have not enough EUR tokens to proceed.
                            <br/>You balance is: <strong>0 EUR</strong> tokens. <br/>Required amount is <strong>140
                                EUR</strong> tokens.<br/>
                        </p>
                        <p className={styles.description}>Charge your account <Link className={styles.link}
                                                                                    to="/market"
                                                                                    href="#">here</Link>!</p>
                    </div>
                </div>)}
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceTooLowModal);