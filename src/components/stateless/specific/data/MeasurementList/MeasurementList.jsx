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
      map((value, key) => ({ key, value, date: _.minBy(value, 'timestamp').timestamp })).
      sort('date').
      map(
        gr => <Section key={gr.key}
                       options={gr.value.map(group => ({ field: group.attribute_id, value: group.value }))}
                       label={gr.key}
                       date={new Date(gr.date).toLocaleString()}/>).value();
  }

  render() {
    return (<div>
      { this.formatMeasurements() }
    </div>);
  }
};
