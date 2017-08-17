import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmBuyModal from '../../modals/ConfirmBuyModal/ConfirmBuyModal';
import ErrorModal from '../../modals/ErrorModal/ErrorModal';
import BalanceTooLowModal from '../../modals/BalanceTooLowModal/BalanceTooLowModal';
import TransactionProgressModal from '../../modals/TransactionProgressModal/TransactionProgressModal';
import { Route } from 'react-router-dom';

const mapStateToProps = (state) => ({
  name: state.modal.name,
  args: state.modal.args,
});

const mapDispatchToProps = (dispatch) => ({});

class ModalContainer extends Component {

  static propTypes = {
    name: PropTypes.string,
    args: PropTypes.object,
  };

  render() {
    if (this.props.name === 'ConfirmBuyModal')
      return (<Route render={({ history }) => (
        <ConfirmBuyModal history={history}/>
      )}/>);
    else if (this.props.name === 'ErrorModal')
      return (<ErrorModal/>);
    else if (this.props.name === 'BalanceTooLowModal')
      return (<BalanceTooLowModal/>);
    else if (this.props.name === 'TransactionProgressModal')
      return (<TransactionProgressModal/>);
    else
      return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
