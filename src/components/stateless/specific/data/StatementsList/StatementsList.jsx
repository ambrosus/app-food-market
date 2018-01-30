import React, { Component } from 'react';
import Section from './Section';
import PropTypes from 'prop-types';
import _ from 'lodash';


export default class StatementsList extends Component {

  static propTypes = {
    options: PropTypes.array,
  };

  static defaultProps = {
    options: [],
  };


  formatStatements = () => {
    return _(this.props.options)
      .sort((a, b) => new Date(b.dt) > new Date(a.dt))
      .map(
        item => <Section key={item.statementId}
                         from={item.from}
                         text={item.data}
                         date={new Date(item.dt).toLocaleString()}/>)
      .value();
  };

  render() {
    return (<div>
      {this.formatStatements()}
    </div>);
  }
};
