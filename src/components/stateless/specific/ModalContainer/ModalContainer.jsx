import React, {Component} from "react";
import {connect} from 'react-redux';
import BalanceTooLowModal from "../BalanceTooLowModal/BalanceTooLowModal";
import TransationProgressModal from "../TransationProgressModal/TransationProgressModal";
import ConfirmBuyModal from "../ConfirmBuyModal/ConfirmBuyModal";

const mapStateToProps = (state) => {
    return {
        name: state.modal,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

class ModalContainer extends Component {
    
    render() {    	
        if (this.props.name == "ConfirmBuyModal")
            return (<ConfirmBuyModal/>);
    	else if (this.props.name == "BalanceTooLowModal")
    		return (<BalanceTooLowModal/>);
    	else if (this.props.name == "TransationProgressModal")
    		return (<TransationProgressModal/>);
    	else 
    		return null;
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);