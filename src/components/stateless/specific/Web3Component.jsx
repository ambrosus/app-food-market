import React, { Component } from 'react';
import Web3 from 'web3';

export default class Web3Component extends Component {
  componentDidMount() {
    if (typeof web3 !== 'undefined') {
      let localProvider = window.web3.currentProvider;
      window.web3.version.getNetwork((err, networkId) => {
        if (networkId === '42') {
          window.web3 = new Web3(localProvider);
        } else {
          window.web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/LRdPGUlZ7Y4yPEkYfPYx'));

        }
      });
      //window.web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/LRdPGUlZ7Y4yPEkYfPYx'));
    } else {
      window.web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/LRdPGUlZ7Y4yPEkYfPYx'));
    }
  }

  render() {
    return (<div/>);
  }
}