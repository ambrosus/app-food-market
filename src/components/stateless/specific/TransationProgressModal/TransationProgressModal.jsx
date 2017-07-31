import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./TransationProgressModal.scss";
import Label from "../../generic/Label/Label";
import {cancel, confirm} from '../../../../redux/actions/ModalActions';
import { Link } from 'react-router-dom';

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

class TransationProgressModal extends Component {

    static defaultProps = {
        visible: false,
        onCancel: () => {
            console.info('onCancel not defined in ', TransationProgressModal)
        },
        onConfirm: () => {
            console.info('onConfirm not defined in ', TransationProgressModal)
        }
    };

    static propTypes = {
        visible: PropTypes.bool,
        onCancel: PropTypes.func,
        onConfirm: PropTypes.func,
    };

    render() {
        return <div>
            {this.props.visible && (<div className={cx(styles.modal, this.props.className)}>
                <div className={styles.inner}>
                    <div className={styles.upper}>
                        <Label className={styles.title} text="Balance is too low"/>
                        <div className={styles.description}>Transation takes a few minutes</div>
                    </div>
                </div>
            </div>)}
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceTooLowModal);

