import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import BalanceTooLowModal from "../BalanceTooLowModal/BalanceTooLowModal";
import ErrorModal from "../ErrorModal/ErrorModal";
import TransactionProgressModal from "../TransactionProgressModal/TransactionProgressModal";
import ConfirmBuyModal from "../ConfirmBuyModal/ConfirmBuyModal";
import BalanceTooLowModal from "../../modals/BalanceTooLowModal/BalanceTooLowModal";
import TransactionProgressModal from "../../modals/TransactionProgressModal/TransactionProgressModal";
import ConfirmBuyModal from "../../modals/ConfirmBuyModal/ConfirmBuyModal";

const mapStateToProps = (state) => {
    return {
        name: state.modal.name,
        args: state.modal.args,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

class ModalContainer extends Component {

    static propTypes = {
        name: PropTypes.string,
        args: PropTypes.object
    };

    render() {
        if (this.props.name == "ConfirmBuyModal")
            return (<ConfirmBuyModal/>);
        else if (this.props.name == "ErrorModal")
            return (<ErrorModal/>);
    	else if (this.props.name == "BalanceTooLowModal")
    		return (<BalanceTooLowModal/>);
    	else if (this.props.name == "TransactionProgressModal")
    		return (<TransactionProgressModal/>);
    	else 
    		return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);