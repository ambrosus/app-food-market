import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";

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
        if (this.props.name) {
            return React.createElement(this.props.name);
        } else
            return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);