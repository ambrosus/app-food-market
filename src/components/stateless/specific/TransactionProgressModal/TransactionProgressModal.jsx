import React, {Component} from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./TransactionProgressModal.scss";
import Label from "../../generic/Label/Label";
import {hideModal} from '../../../../redux/actions/ModalAction';
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        state: state.modal,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onConfirm: () => console.log("not yet implemented"),
        onCancel: () => dispatch(hideModal())
    }
};

class TransactionProgressModal extends Component {

    static defaultProps = {
        state: null,
        onCancel: () => {
            console.info('onCancel not defined in ', TransactionProgressModal)
        },
        onConfirm: () => {
            console.info('onConfirm not defined in ', TransactionProgressModal)
        }
    };

    static propTypes = {
        state: PropTypes.string,
        onCancel: PropTypes.func,
        onConfirm: PropTypes.func,
    };

    render() {
        return <div>
            <div className={cx(styles.modal, this.props.className)}>
                <div className={styles.inner}>
                    <div className={styles.upper}>
                        <Label className={styles.title} text="Operation in progress"/>
                        <div className={styles.spinner}>
                            <img src="./static/images/spinner.svg"/>
                            <img className={styles.icon} src="./static/images/cubes.svg"/>
                        </div>
                        <div className={styles.description}>This transaction can takes few minutes.</div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionProgressModal);

