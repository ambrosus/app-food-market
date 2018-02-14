import React, { Component } from 'react';
import Section from './Section';
import PropTypes from 'prop-types';

export default class StatementsList extends Component {

  static propTypes = {
    options: PropTypes.array,
  };

  static defaultProps = {
    options: [],
  };


  renderStatements = options => {
    return options.map((item, i) => <Section key={i + item.statementId}
                                        id={item.statementId}
                                        from={item.from}
                                        data={item.data}
                                        type={item.statementType}
                                        date={item.dt}/>);
  };

  render() {
    const { options } = this.props;
    return (<div>
      {options.length ? this.renderStatements(options) : null}
    </div>);
  }
};
