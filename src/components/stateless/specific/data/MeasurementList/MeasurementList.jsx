import React, { Component } from 'react';
import Section from './Section';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class MeasurementList extends Component {

  static propTypes = {
    measurements: PropTypes.array,
  };

  static defaultProps = {
    measurements: [],
  };

  formatMeasurements() {
    return _(this.props.measurements).groupBy('event_id').
      map((value, key) => ({ key: key, values: value })).
      map(gr => ({ ...gr, date: _.minBy(gr.values, 'timestamp').timestamp })).
      sort((a, b) => a.date > b.date).
      map(
        gr => <Section key={gr.key}
                       options={gr.values.map(group => ({ field: group.attribute_id, value: group.value }))}
                       label={gr.key}
                       date={new Date(gr.date).toLocaleString()}/>).value();
  }

  render() {
    return (<div>
      {this.formatMeasurements()}
    </div>);
  }
};
