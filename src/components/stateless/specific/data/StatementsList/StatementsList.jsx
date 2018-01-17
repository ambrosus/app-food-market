import React, { Component } from 'react';
import Section from './Section';
import PropTypes from 'prop-types';
import _ from 'lodash';

const STATEMENTS = [{
  "dt": "2018-01-11T18:35:54.008Z",
  "data": "Hello world!",
  "tradeId": 0,
  "statementId": "0x16876d429d9c9d038e16a2b2104c7e771a7ed2e22a69b66fac2d192af95ab39e"
}, {
  "dt": "2018-01-11T18:48:18.975Z",
  "data": "Hello world2!",
  "tradeId": 0,
  "statementId": "0x39543f828e4e52fd00ba389742c66ce94b5cdbac11c63887de3aa4b89ad4df7b"
}];

export default class StatementsList extends Component {

  static propTypes = {
    options: PropTypes.array,
  };

  static defaultProps = {
    options: STATEMENTS,
  };


  formatStatements = () => {
    return _(this.props.options)
      .sort((a, b) => new Date(b.dt) > new Date(a.dt))
      .map(
        item => <Section key={item.dt}
                         text={item.data}
                         date={new Date(item.dt).toLocaleString()}/>)
      .value();
  }

  render() {
    return (<div>
      {this.formatStatements()}
    </div>);
  }
};
