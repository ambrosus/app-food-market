import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./TransationProgressModal.scss";
import Label from "../../generic/Label/Label";
import {hideModal} from '../../../../redux/actions/ModalAction';
import { Link } from 'react-router-dom';

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

class TransationProgressModal extends Component {

    static defaultProps = {
        state: null,
        onCancel: () => {
            console.info('onCancel not defined in ', TransationProgressModal)
        },
        onConfirm: () => {
            console.info('onConfirm not defined in ', TransationProgressModal)
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
                        <div className={styles.description}>Operation might take up to a couple of minutes, be patient.</div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransationProgressModal);

