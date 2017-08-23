import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import ConfirmBuyModalHOC from '../../../../hoc/ConfirmBuyModalHOC';
import ErrorModalHOC from '../../../../hoc/ErrorModalHOC';
import TransactionProgressModalHOC from '../../../../hoc/TransactionProgressModalHOC';

class ModalContainer extends Component {

  static propTypes = {
    name: PropTypes.string,
    args: PropTypes.object,
  };

  render() {
    if (this.props.name === 'ConfirmBuyModal')
      return (<Route render={({ history }) => (
        <ConfirmBuyModalHOC history={history} decimals={this.props.decimals}/>
      )}/>);
    else if (this.props.name === 'ErrorModal')
      return (<ErrorModalHOC/>);
    else if (this.props.name === 'BalanceTooLowModal')
      return (<BalanceTooLowModalHOC/>);
    else if (this.props.name === 'TransactionProgressModal')
      return (<TransactionProgressModalHOC/>);
    else
      return null;
  }
}

export default ModalContainer;
