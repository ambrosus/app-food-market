import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./ErrorModal.scss";
import Label from "../../generic/Label/Label";
import {hideModal} from '../../../../redux/actions/ModalAction';
import {Link} from 'react-router-dom';

const mapStateToProps = (state) => {
    console.log(state);
    return {
        title: state.modal.args.title,
        message: state.modal.args.message,
        reason: state.modal.args.reason
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCancel: () => dispatch(modelHide())
    }
};

class ErrorModal extends Component {

    static defaultProps = {
        state: null,
        title: "Operation unsuccessful",
        message: "We were unanable to perfom operation this time.",
        reason: "Reason unknown.",
        onCancel: () => {
            console.info('onCancel not defined in ', ErrorModal)
        }
    };

    static propTypes = {
        state: PropTypes.string,
        onCancel: PropTypes.func,
        title: PropTypes.string,
        message: PropTypes.string,
        reason: PropTypes.object
    };

    render() {
        return <div>
            <div onClick={this.props.onCancel} className={cx(styles.modal, this.props.className)}>
                <div className={styles.inner}>
                    <img src="./static/images/iconError.svg" className={styles.icon}/>
                    <Label className={styles.title} text={this.props.title}/>
                    <p>
                        { this.props.message }
                    </p>
                    <p className={styles.description}> 
                        { this.props.reason.toString() } 
                    </p>
                </div>
            </div>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);